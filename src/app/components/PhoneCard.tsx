import { motion } from 'motion/react';

type PhoneCardProps = {
  model: string;
  features: string[];
  index: number;
  image: string;
};

export function PhoneCard({ model, features, index, image }: PhoneCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      <div className="flex items-center justify-center mb-6 h-40 rounded-2xl bg-gray-50">
        <img
          src={image}
          alt={model}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <h3 className="text-2xl font-semibold text-center mb-4 text-gray-900">
        {model}
      </h3>

      <ul className="space-y-3">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start text-gray-600">
            <svg
              className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}