import { motion } from 'motion/react';
import { 
  Wrench, 
  Shield, 
  Clock, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageCircle,
  Star,
  Smartphone
} from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { PhoneRepairForm } from './components/PhoneRepairForm';
import { PhoneCard } from './components/PhoneCard';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const repairServices = [
    {
      model: 'iPhone 17',
      image: '/src/assets/Iphone17.PNG',
      features: [
        'Замена дисплея',
        'Ремонт материнской платы',
        'Замена батареи',
        'Восстановление после воды',
        'Замена камеры',
      ],
    },
    {
      model: 'iPhone 17 Pro',
      image: '/src/assets/Iphone17Pro.PNG',
      features: [
        'Замена дисплея ProMotion',
        'Ремонт Face ID',
        'Замена батареи увеличенной емкости',
        'Замена задней панели',
        'Диагностика системы',
      ],
    },
    {
      model: 'iPhone 17 Pro Max',
      image: '/src/assets/Iphone17ProMax.PNG',
      features: [
        'Замена дисплея LTPO',
        'Ремонт тройной камеры',
        'Замена аккумулятора',
        'Восстановление корпуса',
        'Комплексная диагностика',
      ],
    },
    {
    model: 'iPhone 17 Air',
    image: '/src/assets/Iphone17Air.PNG',
    features: [
      'Замена аккумулятора',
      'Восстановление корпуса',
      'Комплексная диагностика',
    ],
  },
  ];

  const salesModels = [
    {
      model: 'iPhone 17',
      image: '/src/assets/Iphone17.PNG',
      features: [
        'Дисплей 6.1" OLED',
        'Chip A18',
        'Двойная камера 48MP',
        'До 20 часов работы',
      ],
    },
    {
      model: 'iPhone 17 Pro',
      image: '/src/assets/Iphone17Pro.PNG',
      features: [
        'Дисплей 6.1" ProMotion',
        'Chip A18 Pro',
        'Тройная камера 48MP',
        'Титановый корпус',
      ],
    },
    {
      model: 'iPhone 17 Pro Max',
      image: '/src/assets/Iphone17ProMax.PNG',
      features: [
        'Дисплей 6.7" ProMotion',
        'Chip A18 Pro',
        'Перископная камера',
        'Максимальная автономность',
      ],
    },
    {
    model: 'iPhone 17 Air',
    image: '/src/assets/Iphone17Air.PNG',
    features: [
      'Ультратонкий корпус',
      'Дисплей 6.6" OLED',
      'Chip A18',
      'Лёгкий и компактный',
    ],
  },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Toaster position="top-right" />
      
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">iPhone Сервис</span>
            </div>
            <div className="hidden md:flex gap-6">
              <button 
                onClick={() => scrollToSection('repair')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Ремонт
              </button>
              <button 
                onClick={() => scrollToSection('sales')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Продажа
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Контакты
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Профессиональный ремонт и продажа iPhone 17
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Быстрый ремонт любой сложности. Гарантия качества. 
                Оригинальные запчасти. Продажа новых iPhone с гарантией.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('repair-form')}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Оставить заявку на ремонт
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Связаться с нами
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759588071781-2c3ba9128497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcGhvbmUlMjAxNyUyMHBybyUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzc0OTQ5Mjc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="iPhone 17 Pro"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: 'Быстро', desc: 'Ремонт от 30 минут' },
              { icon: Shield, title: 'Гарантия', desc: 'До 12 месяцев' },
              { icon: CheckCircle2, title: 'Качество', desc: 'Оригинальные детали' },
              { icon: Star, title: 'Опыт', desc: 'Более 10 лет' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-600 p-4 rounded-full">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Services Section */}
      <section id="repair" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Услуги ремонта iPhone
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Профессиональный ремонт всех моделей iPhone 17. 
              Диагностика бесплатно. Работаем только с оригинальными запчастями.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {repairServices.map((service, index) => (
              <PhoneCard key={index} {...service} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl mb-12"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1769763227060-726b7b926bf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMHJlcGFpciUyMHRlY2huaWNpYW4lMjB0b29sc3xlbnwxfHx8fDE3NzQ5NDkyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="iPhone repair"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/80 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <Wrench className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">Бесплатная диагностика</h3>
                <p className="text-xl">Определим проблему за 15 минут</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Repair Form Section */}
      <section id="repair-form" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Заявка на ремонт
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Оставьте заявку, и мы свяжемся с вами в течение 15 минут
            </p>
            <PhoneRepairForm formType="repair" title="Заявка на ремонт" />
          </motion.div>
        </div>
      </section>

      {/* Sales Section */}
      <section id="sales" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Продажа iPhone 17
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Новые iPhone с официальной гарантией. 
              Позвоните нам для уточнения стоимости и наличия.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {salesModels.map((model, index) => (
              <PhoneCard key={index} {...model} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-xl"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1761907174062-c8baf8b7edb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbWFydHBob25lJTIwZGlzcGxheXxlbnwxfHx8fDE3NzQ5NDkyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="iPhone display"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-700/80 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h3 className="text-3xl font-bold mb-2">Цену уточняйте по телефону</h3>
                <p className="text-xl mb-6">Актуальные цены и наличие в наличии</p>
                <a
                  href="tel:+79200177776"
                  className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Позвонить сейчас
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Purchase Form Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Заявка на покупку iPhone
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Оставьте заявку, и мы расскажем об актуальных ценах и наличии
            </p>
            <PhoneRepairForm formType="purchase" title="Заявка на покупку" />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Свяжитесь с нами
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Остались вопросы? Мы всегда на связи и готовы помочь!
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Телефон</h3>
                    <a 
                      href="tel:+79200177776" 
                      className="text-blue-600 hover:underline text-lg"
                    >
                      +7 (920) 017-77-76
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a 
                      href="mailto:info@iphone-service.ru" 
                      className="text-blue-600 hover:underline text-lg"
                    >
                      ishop52@yandex.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telegram</h3>
                    <a 
                      href="https://t.me/COLAVANILLA831" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Написать в Telegram
                    </a>
                    <p className="text-sm text-gray-500 mt-2">
                      Быстрые ответы на ваши вопросы
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758467700789-d6f49099c884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMHN0b3JlJTIwcHJlbWl1bXxlbnwxfHx8fDE3NzQ5NDkyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Our service"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Smartphone className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold">iPhone Сервис</span>
              </div>
              <p className="text-gray-400">
                Профессиональный ремонт и продажа iPhone с 2026 года
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Ремонт iPhone</li>
                <li>Продажа iPhone</li>
                <li>Диагностика</li>
                <li>Гарантийное обслуживание</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2 text-gray-400">
                <li>+7 (910) 007-77-51</li>
                <li>ishop52@yandex.ru</li>
                <li>Пн-Вс: 10:00 - 21:00</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2026 iPhone Сервис. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
