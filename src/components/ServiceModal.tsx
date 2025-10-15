import { motion } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

interface ServiceData {
  title: string;
  description: string;
  benefits: string[];
  process: { title: string; description: string }[];
}

interface ServiceModalProps {
  service: ServiceData;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  return (
    <>
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2A3B70] to-[#1e2a4a] text-white p-8 rounded-t-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
        >
          <X className="w-5 h-5" />
        </button>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-intro">
            {service.title}
          </h2>
          <p className="text-xl opacity-90 leading-relaxed">
            {service.description}
          </p>
        </motion.div>
      </div>

      {/* Body */}
      <div className="p-8">
        {/* Benefits Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-[#2A3B70] mb-6 font-intro">
            Beneficios de nuestro servicio
          </h3>
          <div className="space-y-4">
            {service.benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                <CheckCircle className="w-6 h-6 text-[#FACB00] flex-shrink-0 mt-1" />
                <p className="text-gray-700 leading-relaxed">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-[#2A3B70] mb-6 font-intro">
            Nuestro proceso
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {service.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#FACB00] hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute left-0 top-0 w-1 h-full bg-[#FACB00] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-[#FACB00] rounded-full flex items-center justify-center text-[#2A3B70] font-bold mr-3">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-bold text-[#2A3B70] font-intro">
                    {step.title}
                  </h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center bg-gradient-to-r from-[#2A3B70] to-[#1e2a4a] rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4 font-intro">
            ¿Listo para optimizar tu logística?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Contáctanos hoy y descubre cómo podemos transformar tus operaciones
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onClose();
              // Scroll to contact section
              setTimeout(() => {
                document.getElementById('contacto')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }, 300);
            }}
            className="bg-[#FACB00] hover:bg-[#e6b800] text-[#2A3B70] font-bold px-8 py-4 rounded-full text-lg transition-colors duration-300"
          >
            Contactar ahora
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}
