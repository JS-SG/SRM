import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Sparkles, BookOpen, CheckCircle, Compass } from "lucide-react";
import Scene3D from "./Scene3D";
import HeroFallback from "./HeroFallback";
import { schoolData } from "../../data/schoolData";

// WebGL Support Detector
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
};

const Hero3D = ({ onOpenAdmissions }) => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
  }, []);

  return (
    <section className="hero-section position-relative">
      <div className="hero-bg-glow-1"></div>
      <div className="hero-bg-glow-2"></div>

      <div className="container position-relative">
        <div className="row align-items-center gy-5">
          {/* Left Hero Content Column */}
          <div className="col-lg-6 hero-content-col">
            <div className="hero-badge">
              <span className="pulse-dot"></span>
              <span>Admissions Open • Academic Year 2026–27</span>
            </div>

            <h1 className="hero-title">
              {schoolData.name.split(",")[0]}
              <br />
              <span className="highlight-gold">{schoolData.name.split(",")[1]?.trim() || "SUBBULAPURAM"}</span>
            </h1>

            <div className="hero-subtitle">
              <Sparkles size={20} className="text-warning" />
              <span>{schoolData.tagline}</span>
            </div>

            <p className="hero-description">
              Welcome to <strong>{schoolData.name}</strong>, established in {schoolData.establishedYear} in {schoolData.location.block}, {schoolData.location.district}. Delivering disciplined, values-based English-medium education from Pre-Primary through Grade 5 in a safe, inspiring environment.
            </p>

            <div className="hero-cta-group">
              <Link to="/about" className="btn-primary-school">
                <Compass size={18} />
                Explore Our School
              </Link>
              
              <Link to="/events" className="btn-outline-school">
                <Calendar size={18} />
                View Events
              </Link>

              <button
                type="button"
                onClick={onOpenAdmissions}
                className="btn-gold-school"
              >
                Admissions Info
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Quick Badges in Hero */}
            <div className="hero-features-list">
              <div className="hero-feature-item">
                <span className="hero-feature-icon"><CheckCircle size={16} /></span>
                <span>Grades 1 to 5 + Pre-Primary</span>
              </div>
              <div className="hero-feature-item">
                <span className="hero-feature-icon"><CheckCircle size={16} /></span>
                <span>English Medium</span>
              </div>
              <div className="hero-feature-item">
                <span className="hero-feature-icon"><CheckCircle size={16} /></span>
                <span>8 Classrooms &amp; Library</span>
              </div>
            </div>
          </div>

          {/* Right Hero 3D Stage Column */}
          <div className="col-lg-6">
            <div className="hero-3d-stage">
              {/* Floating Status Badges 
              <div className="hero-floating-tag top-left">
                <BookOpen size={15} className="text-primary" />
                <span>Beginning the Learning Journey</span>
              </div>*/}

              <div className="hero-floating-tag bottom-right">
                <Sparkles size={15} className="text-warning" />
                <span>Pvt. Unaided • Estd. 2007</span>
              </div>

              {/* 3D Canvas with Graceful Fallback */}
              {hasWebGL && !hasError ? (
                <div className="canvas-container">
                  <Canvas
                    camera={{ position: [0, 2.2, 5.8], fov: 45 }}
                    shadows
                    gl={{ antialias: true, alpha: true }}
                    onCreated={({ gl }) => {
                      gl.setClearColor(0x000000, 0);
                    }}
                    onError={() => setHasError(true)}
                  >
                    <Suspense fallback={null}>
                      <Scene3D />
                    </Suspense>
                  </Canvas>
                </div>
              ) : (
                <HeroFallback />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3D;
