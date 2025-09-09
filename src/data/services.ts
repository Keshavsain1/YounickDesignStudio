export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'interior-design',
    title: 'Interior Design',
    description: 'Transform your spaces with our expert interior design services, creating beautiful and functional environments.',
    icon: 'Home',
    image: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Space Planning', 'Furniture Selection', 'Color Consultation', 'Lighting Design', 'Material Selection']
  },
  {
    id: 'construction',
    title: 'Construction',
    description: 'Professional construction services ensuring quality craftsmanship and timely project completion.',
    icon: 'Building',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Project Management', 'Quality Control', 'Timeline Management', 'Safety Compliance', 'Material Sourcing']
  },
  {
    id: 'renovation',
    title: 'Renovation',
    description: 'Breathe new life into existing spaces with our comprehensive renovation and remodeling services.',
    icon: 'Wrench',
    image: 'https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Space Optimization', 'Structural Changes', 'Modern Updates', 'Energy Efficiency', 'Code Compliance']
  },
  {
    id: 'consultation',
    title: 'Consultation',
    description: 'Expert design consultation to guide your project from concept to completion with professional advice.',
    icon: 'MessageCircle',
    image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['Design Planning', 'Budget Analysis', 'Material Guidance', 'Timeline Planning', 'Concept Development']
  },
  {
    id: '3d-visualization',
    title: '3D Visualization',
    description: 'Bring your design vision to life with stunning 3D renderings and virtual walkthroughs.',
    icon: 'Eye',
    image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['3D Modeling', 'Photorealistic Renders', 'Virtual Tours', 'Material Visualization', 'Design Iterations']
  }
];