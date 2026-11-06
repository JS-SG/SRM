import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSite } from '../context/SiteContext';
import {
  FiArrowRight,
  FiCompass,
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiCheckCircle,
  FiAward
} from 'react-icons/fi';

const Hero = ({ onOpenAdmissions }) => {
  const { heroSettings, siteSettings } = useSite();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(heroSettings?.muted ?? true);
  const [videoError, setVideoError] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="hero-section position-relative overflow-hidden text-white d-flex align-items-center">
      {/* Background Video Layer */}
      {heroSettings?.videoEnabled && !videoError ? (
        <video
          ref={videoRef}
          className="hero-background-video"
          autoPlay={heroSettings.autoplay}
          loop={heroSettings.loop}
          muted={isMuted}
          playsInline
          poster={heroSettings.fallbackPoster}
          onError={() => setVideoError(true)}
        >
          <source src={heroSettings.videoUrl} type="video/mp4" />
        </video>
      ) : null}

      {/* Fallback Poster Background / Fallback Gradient */}
      <div
        className="hero-fallback-poster"
        style={{
          backgroundImage: `url(${heroSettings?.fallbackPoster || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80'})`
        }}
      />

      {/* Sophisticated Dark Gradient & Vignette Overlay */}
      <div className="hero-gradient-overlay" />

      {/* Hero Interactive Main Content Container */}
      <div className="container position-relative z-2 py-5 my-auto">
        <div className="row align-items-center justify-content-between g-5">
          <div className="col-lg-8 col-xl-7">
            {/* Admissions Badge */}
            <div className="hero-badge-pill d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-4 animated-fade-in">
              <span className="live-pulse-dot"></span>
              <span className="fw-semibold small tracking-wide text-uppercase">
                {heroSettings?.badgeText || 'ADMISSIONS OPEN 2026–2027'}
              </span>
            </div>

            {/* School Emblem & Name */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="hero-logo-shield">
                <span className="fw-bold">KKK</span>
              </div>
              <div>
                <h3 className="hero-school-title fw-bold text-white mb-0">
                  {siteSettings?.schoolName || 'KKK N&P School'}
                </h3>
                <span className="hero-school-subtitle text-gold fw-medium">
                  {siteSettings?.schoolFullName || 'K K Kumaran Nursery & Primary School'}
                </span>
              </div>
            </div>

            {/* Hero Main Headline */}
            <h1 className="hero-headline display-4 fw-extrabold text-white mb-3">
              "{heroSettings?.title || 'Where Every Journey Begins'}"
            </h1>

            {/* Subtagline & Core Pillars */}
            <div className="hero-pillars d-flex flex-wrap align-items-center gap-2 gap-md-3 mb-4 text-gold fw-semibold">
              <span>Discover</span>
              <span className="pillar-dot">•</span>
              <span>Learn</span>
              <span className="pillar-dot">•</span>
              <span>Grow</span>
              <span className="pillar-dot">•</span>
              <span>Lead</span>
            </div>

            {/* Subtitle Description */}
            <p className="hero-lead text-white-80 fs-5 mb-5" style={{ maxWidth: '620px', lineHeight: 1.65 }}>
              {heroSettings?.subtitle ||
                'Nurturing curiosity, character, and academic brilliance in a safe, inspiring international-standard learning environment.'}
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap align-items-center gap-3">
              <Link
                to={heroSettings?.primaryCtaLink || '/about'}
                className="btn btn-gold-lg rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2 shadow-lg"
              >
                <FiCompass size={20} />
                <span>{heroSettings?.primaryCtaText || 'Explore Our School'}</span>
              </Link>

              <button
                onClick={onOpenAdmissions}
                className="btn btn-outline-glass rounded-pill px-4 py-3 fw-bold d-inline-flex align-items-center gap-2"
              >
                <span>{heroSettings?.secondaryCtaText || 'Admissions 2026'}</span>
                <FiArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Right Floating Quick Highlights Box */}
          <div className="col-lg-4 d-none d-lg-block">
            <div className="hero-highlights-card p-4 rounded-4 shadow-2xl glass-card">
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-white-15">
                <span className="fw-bold small text-uppercase tracking-wider text-gold">
                  Why Families Choose KKK
                </span>
                <FiAward className="text-gold" size={20} />
              </div>

              <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                <li className="d-flex align-items-start gap-2.5">
                  <FiCheckCircle className="text-success mt-1 flex-shrink-0" size={17} />
                  <div>
                    <strong className="d-block text-white">Holistic English Medium</strong>
                    <span className="text-white-60 small">Play-based Montessori to Middle School pedagogy</span>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-2.5">
                  <FiCheckCircle className="text-success mt-1 flex-shrink-0" size={17} />
                  <div>
                    <strong className="d-block text-white">Modern Smart Classrooms</strong>
                    <span className="text-white-60 small">Interactive 4K digital teaching tools in every room</span>
                  </div>
                </li>
                <li className="d-flex align-items-start gap-2.5">
                  <FiCheckCircle className="text-success mt-1 flex-shrink-0" size={17} />
                  <div>
                    <strong className="d-block text-white">Safe & Inspiring Campus</strong>
                    <span className="text-white-60 small">CCTV monitoring, GPS bus tracking, and lush grounds</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Video Media Controls at Bottom-Right */}
      {heroSettings?.videoEnabled && !videoError && (
        <div className="hero-video-controls position-absolute bottom-0 end-0 m-4 z-3 d-flex align-items-center gap-2">
          <button
            onClick={togglePlay}
            className="video-ctrl-btn p-2 rounded-circle border-0 glass-btn text-white"
            title={isPlaying ? 'Pause cinematic video' : 'Play cinematic video'}
            aria-label="Toggle Video Playback"
          >
            {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
          </button>
          <button
            onClick={toggleMute}
            className="video-ctrl-btn p-2 rounded-circle border-0 glass-btn text-white"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label="Toggle Video Sound"
          >
            {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
          </button>
        </div>
      )}

      {/* Bottom Wave Divider to Smoothly Blend with Next Section */}
      <div className="hero-bottom-curve">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            fill="var(--color-bg-canvas, #f8fafc)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
