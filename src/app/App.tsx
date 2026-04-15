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
  Smartphone,
} from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { PhoneRepairForm } from './components/PhoneRepairForm';
import { PhoneCard } from './components/PhoneCard';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const repairServices = [
    {
      model: 'iPhone',
      image: '/images/Iphone.PNG',
      features: [
        'Замена дисплея',
        'Ремонт материнской платы',
        'Замена батареи',
        'Восстановление после воды',
        'Замена камеры',
      ],
    },
    {
      model: 'Samsung',
      image: '/images/Samsung.PNG',
      features: [
        'Замена дисплея AMOLED',
        'Ремонт камеры',
        'Замена аккумулятора',
        'Ремонт платы',
        'Обновление и прошивка системы'
      ],
    },
    {
      model: 'Xiaomi',
      image: '/images/Xiaomi.PNG',
      features: [
        'Замена дисплея IPS/AMOLED',
        'Ремонт камеры',
        'Замена аккумулятора',
        'Ремонт разъема зарядки',
        'Восстановление после воды',
      ],
    },
    {
      model: 'Honor',
      image: '/images/Honor.PNG',
      features: [
        'Замена дисплея',
        'Замена аккумулятора',
        'Ремонт кнопок',
        'Восстановление корпуса',
        'Диагностика устройства',
      ],
    },
  ];

  const salesModels = [
    {
      model: 'iPhone 17',
      image: '/images/Iphone17.PNG',
      features: [
        'Дисплей 6.1" OLED',
        'Chip A18',
        'Двойная камера 48MP',
        'До 20 часов работы',
      ],
    },
    {
      model: 'iPhone 17 Pro',
      image: '/images/Iphone17Pro.PNG',
      features: [
        'Дисплей 6.1" ProMotion',
        'Chip A18 Pro',
        'Тройная камера 48MP',
        'Титановый корпус',
      ],
    },
    {
      model: 'iPhone 17 Pro Max',
      image: '/images/Iphone17ProMax.PNG',
      features: [
        'Дисплей 6.7" ProMotion',
        'Chip A18 Pro',
        'Перископная камера',
        'Максимальная автономность',
      ],
    },
    {
      model: 'iPhone 17 Air',
      image: '/images/Iphone17Air.PNG',
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
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-50 to-white">
      <Toaster position="top-right" />

      <header className="fixed top-0 z-50 w-full bg-white/90 shadow-sm backdrop-blur-md">
        <nav className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <Smartphone className="h-7 w-7 flex-shrink-0 text-blue-600 md:h-8 md:w-8" />
              <span className="truncate text-xl font-bold text-gray-900 md:text-2xl">
                Сервисный центр 
              </span>
            </div>

            <div className="hidden md:flex gap-6">
              <button
                onClick={() => scrollToSection('repair')}
                className="text-gray-600 transition-colors hover:text-blue-600"
              >
                Ремонт
              </button>
              <button
                onClick={() => scrollToSection('sales')}
                className="text-gray-600 transition-colors hover:text-blue-600"
              >
                Продажа
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 transition-colors hover:text-blue-600"
              >
                Контакты
              </button>
            </div>
          </div>
        </nav>
      </header>

      <section className="px-4 pb-12 pt-24 md:pb-20 md:pt-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:mb-6 md:text-6xl">
                Профессиональный ремонт техники и продажа iPhone
              </h1>

              <p className="mb-6 text-base leading-relaxed text-gray-600 sm:text-lg md:mb-8 md:text-xl">
                Быстрый ремонт любой сложности. Гарантия качества. Оригинальные
                запчасти. Продажа новых iPhone с гарантией.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => scrollToSection('repair-form')}
                  className="w-full rounded-lg bg-blue-600 px-6 py-3 text-white shadow-lg transition-colors hover:bg-blue-700 sm:w-auto md:px-8 md:py-4"
                >
                  Оставить заявку на ремонт
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full rounded-lg border-2 border-blue-600 bg-white px-6 py-3 text-blue-600 transition-colors hover:bg-blue-50 sm:w-auto md:px-8 md:py-4"
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
                className="max-h-[520px] w-full rounded-2xl object-cover shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:gap-8 lg:grid-cols-4">
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
                <div className="mb-3 flex justify-center md:mb-4">
                  <div className="rounded-full bg-blue-600 p-3 md:p-4">
                    <item.icon className="h-6 w-6 text-white md:h-8 md:w-8" />
                  </div>
                </div>
                <h3 className="mb-1 text-lg font-semibold md:mb-2 md:text-xl">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 md:text-base">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="repair" className="px-4 py-12 md:py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center md:mb-16"
          >
            <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Услуги ремонта техники
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 md:text-xl">
              Профессиональный ремонт всех моделей техники. Диагностика
              бесплатно. Работаем только с оригинальными запчастями.
            </p>
          </motion.div>

          <div className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
            {repairServices.map((service, index) => (
              <PhoneCard key={index} {...service} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative mb-12 overflow-hidden rounded-2xl shadow-xl"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1769763227060-726b7b926bf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMHJlcGFpciUyMHRlY2huaWNpYW4lMjB0b29sc3xlbnwxfHx8fDE3NzQ5NDkyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="iPhone repair"
              className="h-64 w-full object-cover md:h-80"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-900/80 to-blue-600/80">
              <div className="px-4 text-center text-white">
                <Wrench className="mx-auto mb-4 h-12 w-12 md:h-16 md:w-16" />
                <h3 className="mb-2 text-2xl font-bold md:text-3xl">
                  Бесплатная диагностика
                </h3>
                <p className="text-base md:text-xl">
                  Определим проблему за 15 минут
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="repair-form" className="bg-gray-50 px-4 py-12 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white p-5 shadow-xl sm:p-6 md:p-12"
          >
            <h2 className="mb-4 text-center text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
              Заявка на ремонт
            </h2>
            <p className="mb-6 text-center text-sm text-gray-600 md:mb-8 md:text-base">
              Оставьте заявку, и мы свяжемся с вами в течение 15 минут
            </p>
            <PhoneRepairForm formType="repair" title="Заявка на ремонт" />
          </motion.div>
        </div>
      </section>

      <section id="sales" className="px-4 py-12 md:py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center md:mb-16"
          >
            <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
              Продажа iPhone 17
            </h2>
            <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 md:text-xl">
              Новые iPhone с официальной гарантией. Позвоните нам для уточнения
              стоимости и наличия.
            </p>
          </motion.div>

          <div className="mb-10 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2 md:gap-8 xl:grid-cols-4">
            {salesModels.map((model, index) => (
              <PhoneCard key={index} {...model} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-xl"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1761907174062-c8baf8b7edb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbWFydHBob25lJTIwZGlzcGxheXxlbnwxfHx8fDE3NzQ5NDkyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="iPhone display"
              className="h-64 w-full object-cover md:h-80"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-gray-900/80 to-gray-700/80">
              <div className="px-4 text-center text-white">
                <h3 className="mb-2 text-2xl font-bold md:text-3xl">
                  Цену уточняйте по телефону
                </h3>
                <p className="mb-6 text-base md:text-xl">
                  Актуальные цены и наличие в наличии
                </p>
                <a
                  href="tel:+79200177776"
                  className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 md:px-8 md:py-4"
                >
                  Позвонить сейчас
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-12 md:py-20">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl bg-white p-5 shadow-xl sm:p-6 md:p-12"
          >
            <h2 className="mb-4 text-center text-2xl font-bold leading-tight text-gray-900 md:text-4xl">
              Заявка на покупку iPhone
            </h2>
            <p className="mb-6 text-center text-sm text-gray-600 md:mb-8 md:text-base">
              Оставьте заявку, и мы расскажем об актуальных ценах и наличии
            </p>
            <PhoneRepairForm formType="purchase" title="Заявка на покупку" />
          </motion.div>
        </div>
      </section>

  <section id="contact" className="px-4 py-12 md:py-20">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="max-w-xl"
      >
        <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
          Свяжитесь с нами
        </h2>
        <p className="mb-8 text-base leading-relaxed text-gray-600 md:text-xl">
          Остались вопросы? Мы всегда на связи и готовы помочь!
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-lg bg-blue-100 p-3">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 font-semibold text-gray-900">Телефон</h3>
              <a
                href="tel:+79200177776"
                className="break-words text-base text-blue-600 hover:underline md:text-lg"
              >
                +7 (920) 017-77-76
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-lg bg-blue-100 p-3">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 font-semibold text-gray-900">Email</h3>
              <a
                href="mailto:ishop52@yandex.ru"
                className="break-all text-base text-blue-600 hover:underline md:text-lg"
              >
                ishop52@yandex.ru
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-lg bg-blue-100 p-3">
              <MessageCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 font-semibold text-gray-900">Telegram</h3>
              <a
                href="https://t.me/COLAVANILLA831"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-center text-white transition-colors hover:bg-blue-700 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Написать в Telegram
              </a>
              <p className="mt-2 text-sm text-gray-500">
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
        className="flex justify-center"
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758467700789-d6f49099c884?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMHN0b3JlJTIwcHJlbWl1bXxlbnwxfHx8fDE3NzQ5NDkyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Our service"
          className="w-full max-h-[500px] rounded-2xl object-cover shadow-xl"
        />
      </motion.div>
    </div>
  </div>
</section>

<footer className="bg-gray-900 px-4 py-10 text-white md:py-12">
  <div className="container mx-auto">
    <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr]">
      <div className="min-w-0">
        <div className="mb-4 flex items-center gap-2">
          <Smartphone className="h-8 w-8 flex-shrink-0 text-blue-400" />
          <span className="text-2xl font-bold">iPhone Сервис</span>
        </div>
        <p className="max-w-sm leading-relaxed text-gray-400">
          Профессиональный ремонт и продажа iPhone с 2017 года
        </p>
      </div>

      <div className="min-w-0 lg:justify-self-center">
        <h3 className="mb-4 font-semibold">Услуги</h3>
        <ul className="space-y-2 break-words text-gray-400">
          <li>Ремонт iPhone</li>
          <li>Продажа iPhone</li>
          <li>Диагностика</li>
          <li>Гарантийное обслуживание</li>
        </ul>
      </div>

      <div className="min-w-0 lg:justify-self-end">
        <h3 className="mb-4 font-semibold">Контакты</h3>
        <ul className="space-y-2 break-words text-gray-400">
          <li>+7 (910) 007-77-51</li>
          <li>ishop52@yandex.ru</li>
          <li>Пн-Вс: 10:00 - 21:00</li>
          <li>Нижний Новгород, ул. Родионова 165к13</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400 md:text-base">
      <p>© 2017 Сервичный центр. Все права защищены.</p>
    </div>
  </div>
</footer>
    </div>
  );
}