import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const transition = {
  duration: 1.2,
  ease: [0.83, 0, 0.17, 1],
};

const servicesData = {
  asesoria: {
    title: "Asesoría y Consultoría Logística",
    description: "Diseñamos soluciones logísticas a la medida, acompañando en todas las etapas desde la planeación hasta la entrega final con optimización de tiempos y reducción de riesgos"
  },
  logistica: {
    title: "Servicios Logísticos Integrales", 
    description: "Coordinamos la gestión operativa y documental para garantizar un flujo logístico eficiente y seguro en transporte internacional"
  },
  vistos: {
    title: "Trámite de Vistos Buenos",
    description: "Gestionamos permisos, licencias y vistos buenos ante autoridades competentes y gubernamentales"
  },
  planeacion: {
    title: "Planeación Logística Integral",
    description: "Acompañamiento completo desde la compra internacional hasta la nacionalización y entrega"
  },
  capacitaciones: {
    title: "Capacitaciones Personalizadas",
    description: "Programas de formación en comercio exterior y logística internacional para emprendedores y PYMES"
  },
  china: {
    title: "Asistencia Comercial en China",
    description: "Acompañamiento profesional en búsqueda, validación y negociación con proveedores asiáticos"
  }
};

export default function ServiceManagerSimple() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentService, setCurrentService] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleServiceClick = (event: any) => {
      const serviceKey = event.detail?.serviceKey;
      const cardElement = event.detail?.cardElement;
      
      if (serviceKey && servicesData[serviceKey as keyof typeof servicesData]) {
        setCurrentService(serviceKey);
        
        // Add expanding class to card
        if (cardElement) {
          cardElement.classList.add('service-card-expanding');
        }
        
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        
        // Start transition
        setTimeout(() => {
          setIsOpen(true);
        }, 300);
      }
    };

    window.addEventListener('openServiceModal', handleServiceClick);
    
    return () => {
      window.removeEventListener('openServiceModal', handleServiceClick);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setShowContent(false);
    
    setTimeout(() => {
      setCurrentService(null);
      document.body.style.overflow = '';
      
      // Remove expanding class from all cards
      const expandingCards = document.querySelectorAll('.service-card-expanding');
      expandingCards.forEach(card => card.classList.remove('service-card-expanding'));
    }, 1200);
  };

  const currentServiceData = currentService ? servicesData[currentService as keyof typeof servicesData] : null;

  return (
    <>
      {/* Card expansion styles */}
      <style jsx global>{`
        .service-card-expanding {
          transform: scale(1.05) !important;
          z-index: 100 !important;
          position: relative !important;
          box-shadow: 0 25px 50px -12px rgba(42, 59, 112, 0.4) !important;
          transition: all 0.6s cubic-bezier(0.83, 0, 0.17, 1) !important;
        }

        .service-card-expanding::before {
          content: '';
          position: absolute;
          top: -5px;
          left: -5px;
          right: -5px;
          bottom: -5px;
          background: linear-gradient(135deg, rgba(250, 203, 0, 0.2), rgba(42, 59, 112, 0.2));
          border-radius: 2rem;
          z-index: -1;
          animation: pulseGlow 0.6s ease-out;
        }

        @keyframes pulseGlow {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
      `}</style>

      {/* Circle Reveal Transition */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Circle Reveal Overlay */}
            <motion.div
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(150% at 50% 50%)" }}
              exit={{ clipPath: "circle(0% at 50% 50%)" }}
              transition={transition}
              className="fixed inset-0 z-[9999] bg-[#2A3B70]"
              style={{ pointerEvents: showContent ? 'none' : 'all' }}
            />
            
            {/* Content Modal */}
            <AnimatePresence>
              {showContent && currentServiceData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2 
                  }}
                  className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
                >
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={handleClose}
                  />
                  
                  {/* Modal Content */}
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#2A3B70] to-[#1e2a4a] text-white p-8 rounded-t-2xl relative">
                      <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                      
                      <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        {currentServiceData.title}
                      </h2>
                      <p className="text-lg opacity-90 leading-relaxed">
                        {currentServiceData.description}
                      </p>
                    </div>

                    {/* Body */}
                    <div className="p-8">
                      <div className="text-center bg-gradient-to-r from-[#2A3B70] to-[#1e2a4a] rounded-2xl p-6 text-white">
                        <h3 className="text-xl font-bold mb-3">
                          ¿Listo para optimizar tu logística?
                        </h3>
                        <p className="mb-4 opacity-90">
                          Contáctanos hoy y descubre cómo podemos transformar tus operaciones
                        </p>
                        <button
                          onClick={() => {
                            handleClose();
                            setTimeout(() => {
                              document.getElementById('contacto')?.scrollIntoView({ 
                                behavior: 'smooth' 
                              });
                            }, 300);
                          }}
                          className="bg-[#FACB00] hover:bg-[#e6b800] text-[#2A3B70] font-bold px-6 py-3 rounded-full transition-colors duration-300"
                        >
                          Contactar ahora
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
