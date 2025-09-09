// src/data/team.ts
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  description: string;
  expertise: string[];
  contact: {
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
  social?: {
    linkedin?: string;
    instagram?: string;
  };
  isFounder: boolean;
  badge?: string; // optional custom badge
}

export const teamMembers: TeamMember[] = [
  {
    id: "founder",
    name: "Nikhil Sain",
    role: "Founder & Lead Designer",
    image:
      "public/assets/team/Nikhil.jpeg",
    description:
      "Mr.Nikhil Sain is an experienced and dynamic interior designer who pursued his Master's degree from Arch College of Interior and Business in 2017. His philosophy revolve saround in corporating the clients's needs into the design process with a creative flair, creating an environment that caters to their requirements for a lifetime. His motive is to provide the best of everything possible through design, including finishes, furnishes, materials, and technology. ",
    expertise: ["Interior Design", "Space Planning", "Project Management", "Design Strategy"],
    contact: {
      email: "nikhil@younickdesign.com",
      phone: "+91 8854883058",
      whatsapp: "+91 8854883058",
    },
    social: {
      linkedin: "https://linkedin.com/in/nikhilsain-design",
      instagram: "https://instagram.com/nikhil_younick",
    },
    isFounder: true,
  },
  {
    id: "co-founder",
    name: "Kamal Rajoriya",
    role: "Co-Founder",
    image:
      "public/assets/team/kamal.jpg",
    description:
      "Er.Kamal Kumawat is an expert civil engineer who completed his Bachelor's degree from the University of Engineering and Management, Jaipur in the year 2019. His approach to design is centered aroun d a client-centric perspective, utilizing a creative mindset to craft an environment that meets their needs for a life time. His ultimate goal is to achieve the epitome of excellence through design, encompassing all aspects from finishes and furnishings to materials and technology. ",
    expertise: ["Construction Management", "3D Visualization", "Technical Planning", "Quality Assurance"],
    contact: {
      email: "kamal@younickdesign.com",
      phone: "+91 9166776697",
      whatsapp: "+91 9166776697",
    },
    social: {
      linkedin: "https://linkedin.com/in/kamalrajoriya-tech",
      instagram: "https://www.instagram.com/kamal_rajoriya99",
    },
    isFounder: true,
  },

  // Ms Pooja Sain — CEO with stylish photo
  {
    id: "pooja-sain",
    name: "Pooja Sain",
    role: "Architect & Designer · CEO",
    image:
      "/public/assets/team/Pooja.jpg",
    description:
      "Pooja leads design thinking and operations, bringing sustainable architecture and refined detailing to every project.",
    expertise: ["Architecture", "Sustainable Design", "3D Visualization", "Design Detailing"],
    contact: {
      email: "pooja@younickdesign.com",
      phone: "+91 90000 00000",
      whatsapp: "+91 90000 00000",
    },
    social: {
      linkedin: "https://linkedin.com/in/pooja-sain",
      instagram: "https://instagram.com/pooja_sain_design",
    },
    isFounder: true, 
    badge: "CEO", 
  },
];
