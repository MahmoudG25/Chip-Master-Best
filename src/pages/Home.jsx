
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { motion } from "motion/react";
import { Link, useLocation } from 'react-router-dom';
import mahmoud from "../assets/mahmoud.png";
import SliderCompany from "../components/SliderCompany";

const Home = () => {
    return (
      <motion.div className="bg-white">
      <Navbar />
      <motion.main className="w-full relative overflow-hidden min-h-[calc(100vh-100px)] w-full">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob" />
            <div className="absolute top-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000" />
            <div className="absolute -bottom-[20%] left-[20%] w-[40%] h-[40%] bg-pink-100/50 rounded-full blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-4000" />
        </div>

        <section className="flex flex-col md:flex-row items-center justify-between py-20 gap-12 md:gap-8 w-[80%] mx-auto">
          
          {/* Left Content */}
          <div className="flex flex-col items-center md:items-start w-full md:w-1/2 z-10">
            
            {/* Community Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-indigo-100 p-1.5 pr-4 rounded-full shadow-sm hover:shadow-md transition-all cursor-default mb-8"
            >
              <div className="flex -space-x-2">
                {[
                  mahmoud,
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100"
                ].map((src, i) => (
                  <img
                    key={i}
                    className="size-8 rounded-full border-2 border-white object-cover"
                    src={src}
                    alt={`User ${i + 1}`}
                  />
                ))}
              </div>
              <p className="text-xs font-medium text-slate-600">
                Trusted by <span className="text-indigo-600 font-bold">5k+</span> repair shops
              </p>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center md:text-left text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6"
            >
              Genuine Mobile <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Phone Motherboards
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center md:text-left text-lg text-slate-600 max-w-lg mb-10 leading-relaxed"
            >
              Your trusted source for original, testing, and unlocked mobile logic boards. 
              We sell high-quality parts and provide expert diagnostic services.
            </motion.p>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Link 
                        to="/auth/register">
                <Button>Get Started</Button>
              </Link>

              <button className="flex items-center gap-2 px-6 py-3 rounded-full text-slate-700 font-medium hover:text-indigo-600 hover:bg-indigo-50 transition-all active:scale-95 group">
                <div className="relative flex items-center justify-center size-8 bg-indigo-100 text-indigo-600 rounded-full group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full md:w-1/2 relative z-10"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-md xl:max-w-lg">
                {/* Abstract decorative shape */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-indigo-200 to-pink-200 rounded-full blur-3xl opacity-30 -z-10" />
                
                <img
                    src="https://images.pexels.com/photos/6755093/pexels-photo-6755093.jpeg"
                    alt="Hero Visual"
                    className="relative w-full rounded-3xl shadow-2xl shadow-indigo-200 rotate-2 hover:rotate-0 transition-all duration-500 ease-out border-4 border-white"
                />
                
                {/* Floating Cards */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
                >
                    <div className="size-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-medium">Quality Check</p>
                        <p className="text-sm font-bold text-gray-800">100% Tested</p>
                    </div>
                </motion.div>
            </div>
          </motion.div>
        </section>
        {/* ----------------------------------------------------------------------------- */}
        <motion.section className="w-full">
          <motion.div className="w-[80%] mx-auto">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <motion.h1 className="text-3xl font-semibold text-center mx-auto">Our Services</motion.h1>
            <motion.p className="text-sm text-slate-500 text-center mt-2 max-w-lg mx-auto">
                We provide comprehensive solutions for mobile phone repairs and parts.
            </motion.p>
            
            <motion.div className="flex flex-wrap items-center justify-center gap-8 pt-12">
                <motion.div className="max-w-[30%] w-full hover:-translate-y-0.5 transition duration-300">
                    <img className="rounded-xl" src="https://images.pexels.com/photos/3520692/pexels-photo-3520692.jpeg" alt="iPhone Logic Board" />
                    <motion.h3 className="text-base text-slate-900 font-medium mt-3">Original Logic Boards</motion.h3>
                    <motion.p className="text-xs text-indigo-600 font-medium mt-1">iPhone, Samsung & Pixel</motion.p>
                </motion.div>
                <motion.div className="max-w-[30%] w-full hover:-translate-y-0.5 transition duration-300">
                    <img className="rounded-xl" src="https://images.pexels.com/photos/6754837/pexels-photo-6754837.jpeg" alt="Mobile Diagnostics" />
                    <motion.h3 className="text-base text-slate-900 font-medium mt-3">Phone Diagnostics</motion.h3>
                    <motion.p className="text-xs text-indigo-600 font-medium mt-1">Power & IC Issues</motion.p>
                </motion.div>
                <motion.div className="max-w-[30%] w-full hover:-translate-y-0.5 transition duration-300">
                    <img className="rounded-xl" src="https://images.pexels.com/photos/6755133/pexels-photo-6755133.jpeg" alt="Consultation" />
                    <motion.h3 className="text-base text-slate-900 font-medium mt-3">Repair Consultation</motion.h3>
                    <motion.p className="text-xs text-indigo-600 font-medium mt-1">For Repair Shops</motion.p>
                </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>
        {/* ----------------------------------------------------------------------------- */}
        <motion.section className="w-full">
          <SliderCompany className="w-[80%] mx-auto mt-24" />
        </motion.section>
        {/* ----------------------------------------------------------------------------- */}
          <div className="w-[80%] mx-auto py-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Getting your device back to life is easier than ever with our streamlined process.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Select Your Part",
                  description: "Browse our inventory of genuine boards for your specific model.",
                  icon: (
                    <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  )
                },
                {
                  step: "02",
                  title: "Lab Testing",
                  description: "Every board undergoes rigorous 15-point QC in our static-free lab.",
                  icon: (
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  )
                },
                {
                  step: "03",
                  title: "Fast Shipping",
                  description: "Secure packaging and expedited shipping to get you back online fast.",
                  icon: (
                    <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-slate-900 select-none">
                    {item.step}
                  </div>
                  <div className="size-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        {/* ----------------------------------------------------------------------------- */}
          <div className="w-[80%] mx-auto py-20">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase">Testimonials</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">Trusted by Repair Experts</h2>
                  <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative">
                    <svg className="absolute -top-4 -left-4 w-10 h-10 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01691 21L5.01691 18C5.01691 16.8954 5.91234 16 7.01691 16H10.0169C10.5692 16 11.0169 15.5523 11.0169 15V9C11.0169 8.44772 10.5692 8 10.0169 8H6.01691C5.46462 8 5.01691 8.44772 5.01691 9V11C5.01691 11.5523 4.56919 12 4.01691 12H3.01691V5H13.0169V15C13.0169 18.3137 10.3306 21 7.01691 21H5.01691Z" />
                    </svg>
                    <p className="text-slate-600 italic mb-6 relative z-10 pt-4">
                      "I've sourced over 50 iPhone logic boards from PhonePartsMaster for my repair shop. Every single one was genuine and worked perfectly. Their QC is unmatched in this industry."
                    </p>
                    <div className="flex items-center gap-4">
                      <img 
                        src={mahmoud} 
                        alt="Alex M." 
                        className="size-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900">Mahmoud Gado</h4>
                        <p className="text-xs text-slate-500">Owner, iFixItFast Repairs</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                 <motion.img 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  src="https://images.pexels.com/photos/6754853/pexels-photo-6754853.jpeg" 
                  className="rounded-2xl shadow-lg w-full h-48 object-cover"
                 />
                 <motion.img 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  src="https://images.pexels.com/photos/6755092/pexels-photo-6755092.jpeg" 
                  className="rounded-2xl shadow-lg w-full h-48 object-cover mt-8"
                 />
              </div>
            </div>
          </div>
        {/* ----------------------------------------------------------------------------- */}
          <div className="w-full py-24">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <section className="flex flex-col items-center justify-center mx-auto max-md:mx-2 max-md:px-2 max-w-[80%] w-full text-center rounded-2xl py-20 md:py-24 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/banners/image-1.png')] bg-cover bg-center bg-no-repeat">
                <h1 className="text-2xl md:text-3xl font-medium text-white max-w-2xl">Ready to earn more money?</h1>
                <div className="h-[3px] w-32 my-1 bg-gradient-to-l from-transparent to-indigo-600"></div>
                <p className="text-sm md:text-base text-white max-w-xl">
                    Join thousands of satisfied technicians. Get 100% original, tested mobile motherboards with a 90-day warranty.
                </p>
                <Link to="/auth/register">
                <button className="px-8 py-2.5 mt-4 text-sm bg-gradient-to-r from-indigo-600 to-violet-500 hover:scale-105 transition duration-300 text-white rounded-full">
                    Get Started
                </button>
                </Link>
                <div className="mt-9 flex items-center justify-center gap-8 text-indigo-100 text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    90-Day Warranty
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    24/7 Support
                  </span>
                </div>
            </section>
          </div>
        {/* ----------------------------------------------------------------------------- */}
      </motion.main>
      <Footer />
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      </motion.div>
    );
};

export default Home;
