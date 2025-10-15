import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ServiceTransition from "./ServiceTransition.tsx";
import ServiceModal from "./ServiceModal.tsx";

const servicesData = {
  asesoria: {
    title: "Asesoría y Consultoría Logística",
    description: "Diseñamos soluciones logísticas a la medida, acompañando en todas las etapas desde la planeación hasta la entrega final con optimización de tiempos y reducción de riesgos",
    benefits: [
      "Diagnóstico logístico integral personalizado para tu empresa",
      "Estructuración optimizada de rutas y modos de transporte",
      "Análisis detallado de costos y reducción de gastos operativos",
      "Acompañamiento especializado en procesos aduaneros",
      "Optimización de tiempos de entrega y reducción de riesgos",
      "Estrategias personalizadas según tu sector y necesidades"
    ],
    process: [
      { title: "Diagnóstico Inicial", description: "Evaluamos tu operación actual, identificamos oportunidades de mejora y analizamos tus necesidades específicas." },
      { title: "Diseño de Solución", description: "Desarrollamos una estrategia logística personalizada con rutas optimizadas y selección de proveedores." },
      { title: "Implementación", description: "Ejecutamos la solución diseñada con acompañamiento continuo y gestión de todos los procesos." },
      { title: "Monitoreo y Optimización", description: "Supervisamos el desempeño, realizamos ajustes necesarios y optimizamos continuamente los procesos." }
    ]
  },
  logistica: {
    title: "Servicios Logísticos Integrales",
    description: "Coordinamos la gestión operativa y documental para garantizar un flujo logístico eficiente y seguro en transporte internacional",
    benefits: [
      "Coordinación completa de transporte internacional (marítimo, aéreo y terrestre)",
      "Seguimiento en tiempo real y trazabilidad total de la carga",
      "Protección integral y aseguramiento de mercancías",
      "Control detallado de costos logísticos y optimización presupuestaria",
      "Coordinación aduanera especializada y gestión documental",
      "Red global de agentes y socios estratégicos"
    ],
    process: [
      { title: "Planificación Logística", description: "Diseñamos la estrategia de transporte más eficiente según el tipo de carga y destino." },
      { title: "Coordinación de Transporte", description: "Gestionamos el transporte multimodal coordinando todos los modos necesarios." },
      { title: "Gestión Documental", description: "Preparamos y gestionamos toda la documentación requerida para el transporte internacional." },
      { title: "Seguimiento y Trazabilidad", description: "Monitoreamos en tiempo real el estado y ubicación de tu carga durante todo el trayecto." }
    ]
  },
  vistos: {
    title: "Trámite de Vistos Buenos",
    description: "Gestionamos permisos, licencias y vistos buenos ante autoridades competentes y gubernamentales, asegurando el cumplimiento normativo de cada operación",
    benefits: [
      "Gestión especializada ante entidades públicas y privadas",
      "Conocimiento profundo de normatividad nacional e internacional",
      "Reducción significativa de tiempos de aprobación",
      "Minimización de riesgos de rechazo o demoras",
      "Seguimiento personalizado de cada trámite",
      "Asesoría en requisitos específicos por tipo de mercancía"
    ],
    process: [
      { title: "Análisis de Requisitos", description: "Identificamos todos los permisos y licencias necesarios según el tipo de mercancía y destino." },
      { title: "Preparación Documental", description: "Compilamos y preparamos toda la documentación requerida para cada entidad." },
      { title: "Presentación de Solicitudes", description: "Radicamos las solicitudes ante las autoridades competentes siguiendo los procedimientos establecidos." },
      { title: "Seguimiento Activo", description: "Monitoreamos el estado de cada trámite y respondemos a requerimientos adicionales." }
    ]
  },
  planeacion: {
    title: "Planeación Logística Integral",
    description: "Acompañamiento completo desde la compra internacional hasta la nacionalización y entrega, logrando eficiencia, trazabilidad y reducción de tiempos",
    benefits: [
      "Planificación integral desde la compra hasta la entrega final",
      "Ejecución y control completo de la cadena logística",
      "Coordinación con proveedores internacionales",
      "Gestión de nacionalización y procesos aduaneros",
      "Optimización de tiempos y reducción de costos",
      "Trazabilidad completa en cada etapa del proceso"
    ],
    process: [
      { title: "Planificación Estratégica", description: "Desarrollamos un plan integral que abarca desde la compra hasta la entrega final." },
      { title: "Coordinación de Compras", description: "Gestionamos la coordinación con proveedores internacionales y negociación de términos." },
      { title: "Gestión de Transporte", description: "Coordinamos el transporte internacional más eficiente según las características de la carga." },
      { title: "Proceso de Nacionalización", description: "Gestionamos todos los trámites aduaneros y documentales para la nacionalización." }
    ]
  },
  capacitaciones: {
    title: "Capacitaciones Personalizadas",
    description: "Programas de formación en comercio exterior y logística internacional para emprendedores y PYMES con enfoque práctico",
    benefits: [
      "Programas especializados en importaciones y exportaciones",
      "Formación en normatividad aduanera y documental",
      "Capacitación en gestión logística integral",
      "Estrategias prácticas de internacionalización",
      "Metodología adaptada a emprendedores y PYMES",
      "Instructores con experiencia real en comercio exterior"
    ],
    process: [
      { title: "Diagnóstico de Necesidades", description: "Evaluamos las necesidades específicas de capacitación de tu empresa o equipo." },
      { title: "Diseño del Programa", description: "Desarrollamos un programa personalizado con contenidos relevantes para tu sector." },
      { title: "Modalidad de Entrega", description: "Definimos la modalidad más conveniente: presencial, virtual o mixta." },
      { title: "Ejecución del Programa", description: "Impartimos las capacitaciones con metodología práctica y casos reales." }
    ]
  },
  china: {
    title: "Asistencia Comercial en China",
    description: "Acompañamiento profesional en búsqueda, validación y negociación con proveedores asiáticos, incluyendo verificación de legalidad, inspecciones y control de calidad",
    benefits: [
      "Búsqueda especializada de proveedores confiables en China",
      "Verificación completa de legalidad y credenciales empresariales",
      "Revisión exhaustiva de documentación comercial",
      "Coordinación de inspecciones y auditorías in-situ",
      "Control de calidad riguroso antes del embarque",
      "Apoyo logístico en consolidación y envío de mercancías"
    ],
    process: [
      { title: "Identificación de Proveedores", description: "Búsqueda y preselección de proveedores potenciales según tus especificaciones." },
      { title: "Verificación y Validación", description: "Verificamos la legalidad, capacidad productiva y credenciales de los proveedores." },
      { title: "Negociación Comercial", description: "Gestionamos las negociaciones comerciales considerando aspectos culturales y técnicos." },
      { title: "Inspección y Auditoría", description: "Coordinamos inspecciones in-situ y auditorías de calidad en las instalaciones." }
    ]
  }
};

export default function ServiceManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentService, setCurrentService] = useState<string | null>(null);
  const [expandingCard, setExpandingCard] = useState<string | null>(null);

  useEffect(() => {
    // Listen for service card clicks
    const handleServiceClick = (event: CustomEvent) => {
      const serviceKey = event.detail.serviceKey;
      const cardElement = event.detail.cardElement;
      
      if (serviceKey && servicesData[serviceKey as keyof typeof servicesData]) {
        setExpandingCard(serviceKey);
        setCurrentService(serviceKey);
        
        // Add expanding class to card
        cardElement?.classList.add('service-card-expanding');
        
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        
        // Start transition after card expansion
        setTimeout(() => {
          setIsOpen(true);
        }, 300);
      }
    };

    // Add event listener
    window.addEventListener('openServiceModal', handleServiceClick as EventListener);
    
    return () => {
      window.removeEventListener('openServiceModal', handleServiceClick as EventListener);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    
    // Clean up after transition
    setTimeout(() => {
      setCurrentService(null);
      setExpandingCard(null);
      document.body.style.overflow = '';
      
      // Remove expanding class from all cards
      const expandingCards = document.querySelectorAll('.service-card-expanding');
      expandingCards.forEach(card => card.classList.remove('service-card-expanding'));
    }, 1200);
  };

  const handleTransitionComplete = () => {
    // Transition is complete, modal content is now visible
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

      {/* Service Transition */}
      <ServiceTransition
        isOpen={isOpen}
        onComplete={handleTransitionComplete}
        onClose={handleClose}
      >
        {currentServiceData && (
          <ServiceModal
            service={currentServiceData}
            onClose={handleClose}
          />
        )}
      </ServiceTransition>
    </>
  );
}
