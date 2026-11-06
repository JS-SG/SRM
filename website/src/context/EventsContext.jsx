import React, { createContext, useContext, useState } from "react";
import { initialEventsData } from "../data/events";

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState(initialEventsData);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const addEvent = (newEvent) => {
    const formattedEvent = {
      ...newEvent,
      id: `custom-event-${Date.now()}`,
      isSample: true,
      type: "upcoming",
      featured: false,
      displayDate: newEvent.displayDate || newEvent.date,
      highlights: newEvent.highlights?.length
        ? newEvent.highlights
        : ["Special community celebration", "Student and staff participation", "Open for all students"],
      image:
        newEvent.image ||
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800"
    };

    setEvents((prev) => [formattedEvent, ...prev]);
    showToast(`Event "${newEvent.title}" posted successfully (Local Demo State)!`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        selectedEvent,
        setSelectedEvent,
        isPostModalOpen,
        setIsPostModalOpen,
        addEvent,
        toastMessage,
        setToastMessage
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};
