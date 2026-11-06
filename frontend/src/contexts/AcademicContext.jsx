import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { academicService } from '../services/academicService';
import { useAuth } from './AuthContext';

const AcademicContext = createContext(null);

export const AcademicProvider = ({ children }) => {
  const { user } = useAuth();
  const [academicYears, setAcademicYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(null);
  const [standards, setStandards] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAcademicData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [yearsRes, stdsRes, divsRes, classesRes] = await Promise.all([
        academicService.getYears(),
        academicService.getStandards(),
        academicService.getDivisions(),
        academicService.getClasses(),
      ]);

      const years = yearsRes.data || [];
      setAcademicYears(years);
      const activeYear = years.find((y) => y.is_current) || years[0] || null;
      setCurrentYear(activeYear);

      setStandards(stdsRes.data || []);
      setDivisions(divsRes.data || []);
      setClasses(classesRes.data || []);
    } catch (err) {
      console.error('Failed to load academic data:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadAcademicData();
    }
  }, [user, loadAcademicData]);

  return (
    <AcademicContext.Provider
      value={{
        academicYears,
        currentYear,
        setCurrentYear,
        standards,
        divisions,
        classes,
        loading,
        refreshAcademicData: loadAcademicData,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return context;
};
