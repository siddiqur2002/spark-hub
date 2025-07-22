import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, LucideProps } from 'lucide-react';
import * as THREE from 'three';
// FIX: Using a more explicit import path with the '.js' extension.
// This helps bundlers and TypeScript resolve the correct file, which exports a class
// that can be instantiated with 'new', instead of the React component from @react-three/drei.
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import emailjs from '@emailjs/browser';

// --- Type Definitions ---

// Defines the structure for the form data state
interface IFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Defines the structure for the form submission status
interface IFormStatus {
  message: string;
  type: 'success' | 'error' | '';
}

// Defines the structure for contact information items
interface IContactInfo {
  icon: React.FC<LucideProps>;
  label: string;
  value: string;
  href: string;
}

// Defines the structure for social media links
interface ISocialLink {
  icon: React.FC<LucideProps>;
  label: string;
  href: string;
  color: string;
}


// --- 3D Scene Component (TSX) ---
// This component creates the animated 3D particle background.
const ThreeScene: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Ensure the mount point exists
        if (!mountRef.current) return;

        const currentMount = mountRef.current;

        // Scene, Camera, and Renderer setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x111827); // Corresponds to dark-gray-900
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 0.8);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // OrbitControls for mouse interaction
        // FIX: Instantiating the class directly from the corrected import.
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;

        // 3D Particle System
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCnt = 5000;
        const posArray = new Float32Array(particlesCnt * 3);
        for (let i = 0; i < particlesCnt * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 15;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: 0x60a5fa, // Corresponds to blue-400
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            particlesMesh.rotation.y += 0.0012;
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize to keep the scene responsive
        const handleResize = () => {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listeners and the renderer on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            currentMount.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, width: '100vw', height: '100vh' }} />;
};

// --- Data for Contact Info & Social Links (Typed) ---
const contactInfo: IContactInfo[] = [
  { icon: Mail, label: 'Email', value: 'sidnur2002@gmail.com', href: 'mailto:sidnur2002@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+880 1784071666', href: 'tel:+880 1784071666' },
  { icon: MapPin, label: 'Location', value: 'Dhaka, Bangladesh', href: '#' },
];

const socialLinks: ISocialLink[] = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/siddiqur2002', color: 'hover:text-white' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-blue-500' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: 'hover:text-blue-400' },
];

// --- Main Contact Component (TSX) ---
export function Contact(): JSX.Element {
  const [formData, setFormData] = useState<IFormData>({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({ message: '', type: '' });
  const form = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return; // Guard clause to ensure form ref is available

    setIsSubmitting(true);
    setFormStatus({ message: '', type: '' });

    // --- EmailJS Integration ---
    // **ACTION REQUIRED:** Replace these placeholders with your actual EmailJS credentials.
    const serviceID = 'service_8okt0r9';
    const templateID = 'template_52paz2w';
    const publicKey = '-HQ3DlFAL753uL3w4';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
          console.log('EmailJS Success:', result.text);
          setFormStatus({ message: 'Message sent successfully!', type: 'success' });
          setIsSubmitting(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
      }, (error) => {
          console.error('EmailJS Error:', error.text);
          setFormStatus({ message: 'Failed to send message. Please try again.', type: 'error' });
          setIsSubmitting(false);
      });
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
        <ThreeScene />
        <section id="contact" className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Ready to work together? Let's create something amazing!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Contact Information */}
              <div className="space-y-8 bg-black bg-opacity-20 backdrop-blur-sm p-8 rounded-2xl">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Let's Start a Conversation
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    I'm always open to discussing new opportunities, creative projects, 
                    or just having a chat about technology and design. Don't hesitate to reach out!
                  </p>
                </div>
                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <a key={info.label} href={info.href} className="flex items-center space-x-0 lg:space-x-4 p-5 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg hover:bg-gray-700 transition-all duration-300 group">
                      <div className="flex-shrink-0">
                        <info.icon className="w-3 lg:w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{info.label}</p>
                        <p className="text-lg font-semibold text-white">{info.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="pt-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className={`p-3 bg-gray-800 bg-opacity-50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-400 ${social.color}`}>
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-2xl shadow-xl p-8">
                <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white transition-all duration-300 placeholder-gray-500" placeholder="Your Name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white transition-all duration-300 placeholder-gray-500" placeholder="name78@gmail.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white transition-all duration-300 placeholder-gray-500" placeholder="Project Collaboration" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white transition-all duration-300 resize-none placeholder-gray-500" placeholder="Tell me about your project or just say hello!" />
                  </div>
                  {formStatus.message && (
                    <div className={`p-3 rounded-lg text-center ${formStatus.type === 'success' ? 'bg-green-500 bg-opacity-30 text-green-300' : 'bg-red-500 bg-opacity-30 text-red-300'}`}>
                        {formStatus.message}
                    </div>
                  )}
                  <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:scale-105">
                    {isSubmitting ? (
                      <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div><span>Sending...</span></>
                    ) : (
                      <><Send className="w-5 h-5" /><span>Send Message</span></>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-gray-700 text-center">
              <p className="text-gray-400">
                © 2024 MD. SIDDIQUR RAHMAN. Built with love and lots of coffee ☕
              </p>
            </div>
          </div>
        </section>
    </div>
  );
}
