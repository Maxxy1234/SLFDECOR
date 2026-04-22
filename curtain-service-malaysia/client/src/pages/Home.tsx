/**
 * Design reminder for this file: Tropical Editorial Heritage.
 * Keep the experience warm, tactile, asymmetrical, and quietly luxurious.
 * Favor linen surfaces, editorial spacing, espresso typography, and restrained motion.
 */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapView } from "@/components/Map";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ChevronRight,
  Clock3,
  LucideIcon,
  MapPin,
  Menu,
  MessageCircle,
  Palette,
  PhoneCall,
  Ruler,
  Scissors,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

const BUSINESS_NAME = "SLF Decor Furnishing Sdn Bhd";
const TAGLINE = "Custom curtains, blinds, wallpaper, and reupholstery solutions styled and installed for refined homes and spaces across Penang.";
const PHONE_NUMBER = "+60126057668";
const WHATSAPP_URL = "https://wa.me/60126057668";
const ADDRESS = "306 E, Jalan Burma, Pulau Tikus, 10350 George Town, Pulau Pinang";
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=306%20E%2C%20Jalan%20Burma%2C%20Pulau%20Tikus%2C%2010350%20George%20Town%2C%20Pulau%20Pinang";

// Easy swap: replace this single constant with the client's own horizontal business footage.
const HERO_VIDEO_URL = "https://cdn.pixabay.com/video/2022/06/28/122355-725067752_large.mp4";
const HERO_FALLBACK_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663579763593/hodDtqzomsDCNk4YKKxZwx/hero-curtain-living-room-g6rj5mtVGnfjQPJ8Kgtq5a.webp";
const CONSULTATION_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663579763593/hodDtqzomsDCNk4YKKxZwx/consultation-fabric-selection-7oCngJP6S5n9JvSotAnJMN.webp";
const BEDROOM_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663579763593/hodDtqzomsDCNk4YKKxZwx/bedroom-curtain-installation-ki7EtzxENtbVgGJQwpkPMo.webp";
const OFFICE_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663579763593/hodDtqzomsDCNk4YKKxZwx/office-curtain-project-C9RYeixm3mEebqgUJrrVMN.webp";
const LIVING_ROOM_STOCK = "/manus-storage/6JuvRQt2Chhp_c8acdf3f.jpg";
const PATTERNED_ROOM_STOCK = "/manus-storage/a5w8jT7eDOK8_96327577.jpg";
const OFFICE_STOCK = "/manus-storage/UVMOlEUqly3m_340663fc.webp";
const SHADE_ROOM_STOCK = "/manus-storage/1Fnfw9iyH8RP_57b0db15.webp";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Our Work" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/contact", label: "Contact" },
] as const;

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: `${BUSINESS_NAME} | Custom Curtain Service in Penang`,
    description:
      "Curtains, blinds, wallpaper, reupholstery, ziptrack, measurement, consultation, and installation service in Penang, Malaysia.",
  },
  "/gallery": {
    title: `Our Work | ${BUSINESS_NAME}`,
    description:
      "Browse warm, elegant curtain transformations across living rooms, bedrooms, kitchens, and offices.",
  },
  "/services": {
    title: `Services | ${BUSINESS_NAME}`,
    description:
      "Explore free home measurement, fabric consultation, custom curtain making, and professional installation services.",
  },
  "/how-it-works": {
    title: `How It Works | ${BUSINESS_NAME}`,
    description:
      "See the simple four-step process from consultation and measurement to fabric selection and installation.",
  },
  "/contact": {
    title: `Contact | ${BUSINESS_NAME}`,
    description:
      "Contact SLF Decor Furnishing Sdn Bhd on WhatsApp or phone and find the George Town, Pulau Pinang location.",
  },
};

type GalleryCategory = "All" | "Living Room" | "Bedroom" | "Kitchen" | "Office";
type WorkCategory = "All" | "Curtain" | "Blind" | "Wallpaper";

type GalleryItem = {
  title: string;
  category: Exclude<GalleryCategory, "All">;
  image: string;
  beforeLabel: string;
  afterLabel: string;
  accent: string;
};

type WorkItem = {
  title: string;
  category: Exclude<WorkCategory, "All">;
  image: string;
  description: string;
};


interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
}

const SERVICE_ITEMS: ServiceItem[] = [
  {
    icon: Ruler,
    title: "Free Home Measurement",
    description: "We visit your home, take precise measurements, and assess natural light, ceiling height, and installation needs.",
    detail: "No guesswork, no pressure, and no hidden measuring fee.",
  },
  {
    icon: Palette,
    title: "Fabric & Design Consultation",
    description: "We help you choose textures, drape fullness, colors, and curtain styles that suit your room and daily lifestyle.",
    detail: "Ideal for homes that want warmth, privacy, and a polished interior feel.",
  },
  {
    icon: Scissors,
    title: "Custom Curtain Making",
    description: "Every set is tailored to your window dimensions, preferred fullness, and chosen fabric for a refined final fit.",
    detail: "Sheers, day curtains, and full drapery can be layered for depth and softness.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "We install tracks, rods, and finished curtains carefully so the final drape looks clean, balanced, and complete.",
    detail: "The last step is handled with the same attention as the design stage.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Book a Consultation",
    body: "Reach out on WhatsApp or by phone to arrange a visit that suits your schedule.",
  },
  {
    number: "02",
    title: "We Measure",
    body: "We assess your windows, ceiling lines, installation needs, and the feel you want for each room.",
  },
  {
    number: "03",
    title: "Choose Your Fabric & Style",
    body: "We guide you through fabric, color, layering, pleat style, and practical considerations such as light control and privacy.",
  },
  {
    number: "04",
    title: "We Make & Install",
    body: "Your curtains are custom made and professionally installed for a finished, home-ready result.",
  },
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: "Soft daylight living room",
    category: "Living Room",
    image: HERO_FALLBACK_IMAGE,
    beforeLabel: "Bare window wall with harsh afternoon glare.",
    afterLabel: "Layered sheers and drapes bring warmth, privacy, and softness.",
    accent: "Terracotta",
  },
  {
    title: "Bedroom retreat with layered drapery",
    category: "Bedroom",
    image: BEDROOM_IMAGE,
    beforeLabel: "Light leakage and a room that felt visually unfinished.",
    afterLabel: "Full-height curtains add calm, texture, and better rest.",
    accent: "Walnut",
  },
  {
    title: "Client fabric consultation setting",
    category: "Living Room",
    image: CONSULTATION_IMAGE,
    beforeLabel: "Uncertain fabric direction and no clear styling plan.",
    afterLabel: "A coordinated palette with texture, tone, and drape clarity.",
    accent: "Linen",
  },
  {
    title: "Boutique office meeting room",
    category: "Office",
    image: OFFICE_IMAGE,
    beforeLabel: "Hard light and an underdressed studio corner.",
    afterLabel: "Softened light and tailored curtains for a composed workspace.",
    accent: "Espresso",
  },
  {
    title: "Scandinavian-style living area",
    category: "Living Room",
    image: LIVING_ROOM_STOCK,
    beforeLabel: "A bright room without softness or visual framing.",
    afterLabel: "Curtains create a gentler outline and a more welcoming mood.",
    accent: "Sand",
  },
  {
    title: "Pattern-rich family room",
    category: "Kitchen",
    image: PATTERNED_ROOM_STOCK,
    beforeLabel: "Busy surfaces competing with direct sunlight.",
    afterLabel: "Balanced window dressing settles the room and improves comfort.",
    accent: "Clay",
  },
  {
    title: "Quiet home office corner",
    category: "Office",
    image: OFFICE_STOCK,
    beforeLabel: "Practical space with strong glare during work hours.",
    afterLabel: "Tailored shading adds focus while keeping the room warm.",
    accent: "Bronze",
  },
  {
    title: "Crisp window treatment with timber tones",
    category: "Bedroom",
    image: SHADE_ROOM_STOCK,
    beforeLabel: "The room lacked softness and visual depth.",
    afterLabel: "Window treatment ties together the palette and atmosphere.",
    accent: "Beige",
  },
];

const WORK_ITEMS: WorkItem[] = [
  {
    title: "Curtain 1",
    category: "Curtain",
    image: "/manus-storage/008307f8-e466-422d-9aef-dc29e243d1cb_fa9f7aac.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 2",
    category: "Curtain",
    image: "/manus-storage/03f8c2a8-3f91-48ae-ba2d-c76df40563cb_4a6ec132.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 3",
    category: "Curtain",
    image: "/manus-storage/0639fc67-46c6-4c5a-bcd0-c96ae9d9e38f_b45003a4.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 4",
    category: "Curtain",
    image: "/manus-storage/078358fc-20ea-4f80-8110-db38947becac_18192d51.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 5",
    category: "Curtain",
    image: "/manus-storage/07f01752-31cc-47ed-bb54-18cb984cfd1a_5032d710.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 6",
    category: "Curtain",
    image: "/manus-storage/08bd67aa-ebd2-475a-bcbd-c5ab1023f09f_388f1548.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 7",
    category: "Curtain",
    image: "/manus-storage/09bc8964-0184-47d2-b5ce-727c06ae4649_68bd0c3a.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 8",
    category: "Curtain",
    image: "/manus-storage/0dd28132-7063-4797-8f68-8f1d2cb62e9e_bb8e15a3.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 9",
    category: "Curtain",
    image: "/manus-storage/0e1dd93b-54f4-43a2-9696-ca72d3e75fe7_793cdc59.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 10",
    category: "Curtain",
    image: "/manus-storage/158d86b9-c5fc-4ac9-8b0c-2e00c904ff30_cb5b8c8b.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 11",
    category: "Curtain",
    image: "/manus-storage/1595ef07-e34e-4c47-958b-5ac1f5d19c40_e238666d.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 12",
    category: "Curtain",
    image: "/manus-storage/17533c13-5ee8-4462-9005-7c256e3183ef_a090d0ab.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 13",
    category: "Curtain",
    image: "/manus-storage/19180fe8-6c12-4bee-ab16-4d9779c67b41_b4625c02.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 14",
    category: "Curtain",
    image: "/manus-storage/1abc12fb-0e43-4cd4-8038-8e838d75c448_3b71b597.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 15",
    category: "Curtain",
    image: "/manus-storage/1f6fbe8a-e04c-46df-bf6d-00c0f8ae1c03_8ff471cd.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 16",
    category: "Curtain",
    image: "/manus-storage/2278f9db-f816-40c9-96bd-36ef3c4f12bc_032b5337.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 17",
    category: "Curtain",
    image: "/manus-storage/2377c573-54a4-46de-92c0-a35c5651f740_9bff40f6.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 18",
    category: "Curtain",
    image: "/manus-storage/23ce1201-5ed5-482d-b1de-316c159cb7ac_29650c9b.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 19",
    category: "Curtain",
    image: "/manus-storage/28a26eb2-9df4-4c57-8930-938dc21ffed9_9148c9e2.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 20",
    category: "Curtain",
    image: "/manus-storage/2e0c9967-4dcd-4892-aa40-efb581955f8c_ea3b81aa.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 21",
    category: "Curtain",
    image: "/manus-storage/2f674893-9d58-4ea9-a6e5-51ffe8d38653_6c5b29be.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 22",
    category: "Curtain",
    image: "/manus-storage/3246bf20-e6d7-4a6d-a53e-151e8f4f7625_5a7bc768.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 23",
    category: "Curtain",
    image: "/manus-storage/32dc1c8a-064e-452b-ba5b-8eeb5651a848_f45ddd6f.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 24",
    category: "Curtain",
    image: "/manus-storage/3366215b-ab22-41db-958d-ea771ff508d3_cf4156ef.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 25",
    category: "Curtain",
    image: "/manus-storage/36e64f80-4b53-41bc-878b-cbf9098aacf1_32720931.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 26",
    category: "Curtain",
    image: "/manus-storage/3828d002-481f-4c69-92e6-4cc89bec126c_0ed78502.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 27",
    category: "Curtain",
    image: "/manus-storage/38c5b7f2-413c-4b82-a3cb-62fddbc59f98_eac1beb0.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 28",
    category: "Curtain",
    image: "/manus-storage/407d5ad3-ac55-45c1-ab27-a0350d4149bc_66f18edd.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 29",
    category: "Curtain",
    image: "/manus-storage/40b37904-cf69-49ea-9268-29ac0093bfea_99ef57ae.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 30",
    category: "Curtain",
    image: "/manus-storage/41f06667-e8c8-447b-be87-82944a1bcf9e_d075b7a6.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 31",
    category: "Curtain",
    image: "/manus-storage/446c9d40-58b0-4748-a1ce-7ee9a4e003cf_a95d52a5.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 32",
    category: "Curtain",
    image: "/manus-storage/45d078b3-0aba-4794-a4dc-a5dfb4c3ce89_37af867b.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 33",
    category: "Curtain",
    image: "/manus-storage/4816a3bb-2799-45ca-a776-c4f487ed0967_1af24f2e.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 34",
    category: "Curtain",
    image: "/manus-storage/48cb79d6-8709-4b7b-aafd-6858e31a1256_1e6efbb7.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 35",
    category: "Curtain",
    image: "/manus-storage/4b7e21f9-66cf-435a-bbbb-5506aa8192f6_810885d2.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 36",
    category: "Curtain",
    image: "/manus-storage/4e0746b0-fc0e-4031-92ff-f75430474943_87160635.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 37",
    category: "Curtain",
    image: "/manus-storage/50bc435d-4e21-44bf-b2f0-26380c5d8aee_c435baf9.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 38",
    category: "Curtain",
    image: "/manus-storage/51294855-1563-4941-a86d-e49cab6a64c8_2dc69c0d.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 39",
    category: "Curtain",
    image: "/manus-storage/5146f3a0-e83a-453c-a467-4806aacbb2b7_589ee261.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 40",
    category: "Curtain",
    image: "/manus-storage/51e49b3d-fcab-4c62-aa52-cfce77ee10d3_229e7e89.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 41",
    category: "Curtain",
    image: "/manus-storage/59fd5360-8265-4056-94e8-d5f1ea7b59a3_1a956525.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 42",
    category: "Curtain",
    image: "/manus-storage/5c966852-f28d-40f5-86f0-1422cc2af188_4a94989a.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 43",
    category: "Curtain",
    image: "/manus-storage/5df828f2-afda-4e60-a16b-5bbc1ee90c8f_9ed5192f.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 44",
    category: "Curtain",
    image: "/manus-storage/654bef1a-8c0d-4779-b446-693be9d171c6_391cfbd5.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 45",
    category: "Curtain",
    image: "/manus-storage/6662f132-bb34-41e6-afdf-1958a99b164a_8c0f0825.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 46",
    category: "Curtain",
    image: "/manus-storage/68928071-2a91-4262-a808-89c7d7279afd_c24f42c9.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 47",
    category: "Curtain",
    image: "/manus-storage/6ac81a43-fe3a-4636-86f1-61c6b547631b_1c53418a.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 48",
    category: "Curtain",
    image: "/manus-storage/6dd7251a-52d7-4980-8417-b057732e9115_df161704.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 49",
    category: "Curtain",
    image: "/manus-storage/72d90269-74a3-4b1f-bbe4-5fa211ece567_ecdffe87.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 50",
    category: "Curtain",
    image: "/manus-storage/78284fef-c462-44a6-8ef8-13f76232eb15_44749ac1.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 51",
    category: "Curtain",
    image: "/manus-storage/7936595a-8b8a-4946-bb1c-27db6752922f_d85fdef0.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 52",
    category: "Curtain",
    image: "/manus-storage/7a5cf938-4e64-47a4-90ec-6e5559eea1c8_9f6ee9f5.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 53",
    category: "Curtain",
    image: "/manus-storage/7b3b3422-a7d0-4683-a381-4f489be681c5_bd092ced.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 54",
    category: "Curtain",
    image: "/manus-storage/7b69244d-4a2c-49cf-8a19-4ead245ce5d9_cf42b3ad.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 55",
    category: "Curtain",
    image: "/manus-storage/7bb31747-c17c-4c46-86e1-46ee325f224c_680e91f4.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 56",
    category: "Curtain",
    image: "/manus-storage/7d1ed205-2acb-4627-8b9b-adac71c3e488_37f15e09.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 57",
    category: "Curtain",
    image: "/manus-storage/7e862e5f-d06e-489b-96aa-5b5d6ec69539_a5904ef9.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 58",
    category: "Curtain",
    image: "/manus-storage/82bdb8b4-fd00-4150-b6e5-3c530b935189_e32587d6.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 59",
    category: "Curtain",
    image: "/manus-storage/85ef6b85-967b-4111-832a-e90101f87828_6302a10a.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 60",
    category: "Curtain",
    image: "/manus-storage/86422493-8336-440c-a879-b41285a16333_ade50405.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 61",
    category: "Curtain",
    image: "/manus-storage/870c8e70-eea4-4d31-9e1c-643a7c814287_e7004056.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 62",
    category: "Curtain",
    image: "/manus-storage/87fb0895-a22d-4346-b0e4-3453ce0e4401_92b998cf.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 63",
    category: "Curtain",
    image: "/manus-storage/8ac3f260-720d-4067-a834-c13575225890_5033a082.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 64",
    category: "Curtain",
    image: "/manus-storage/8cb1ac57-4712-45a7-857c-4188c8971310_c9629f8f.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 65",
    category: "Curtain",
    image: "/manus-storage/8e3a9a8d-76dd-4c97-99b5-f65768b11320_41cb0ad2.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 66",
    category: "Curtain",
    image: "/manus-storage/901019ba-3eba-4f77-b580-fe9c3b24722c_eb30a9a0.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 67",
    category: "Curtain",
    image: "/manus-storage/9304b023-013d-4cd9-80a8-64137a9529c0_0c1a92b5.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 68",
    category: "Curtain",
    image: "/manus-storage/93c9ba1e-4245-4406-aad7-e2d74b9d1ec9_1a96711c.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 69",
    category: "Curtain",
    image: "/manus-storage/94a85331-3f1c-45da-83ec-c3cea8b6a22d_ba031183.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 70",
    category: "Curtain",
    image: "/manus-storage/95d21341-92e5-4c15-99bb-88a66d6b9b0c_3ec7d6c8.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 71",
    category: "Curtain",
    image: "/manus-storage/9c381a08-cb93-44f5-bdf5-ecf7943e8923_f3f1f773.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 72",
    category: "Curtain",
    image: "/manus-storage/9d79b0fe-9f99-49ed-b16d-9435a040851e_8eb410cd.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 73",
    category: "Curtain",
    image: "/manus-storage/9d7c847c-7a26-4419-bce0-2a7506030d15_18ffd333.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 74",
    category: "Curtain",
    image: "/manus-storage/9dd77d8e-6399-4733-bdcf-9003334bab2f_ed6d9fdc.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 75",
    category: "Curtain",
    image: "/manus-storage/9f48e008-3179-4c2e-ad3e-580b776c3ae6_999f94f0.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 76",
    category: "Curtain",
    image: "/manus-storage/9f66dc07-1e2b-4b03-ae3e-5ab972622c4c_e3d43874.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 77",
    category: "Curtain",
    image: "/manus-storage/a41e1c3f-8b7a-40cb-9c36-1822d7d3b989_c0b6881f.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 78",
    category: "Curtain",
    image: "/manus-storage/aa9e4f45-2687-490e-9c59-56f45e19f848_61381851.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 79",
    category: "Curtain",
    image: "/manus-storage/ab2b5fee-b040-4564-81d4-85b665934652_83accc51.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 80",
    category: "Curtain",
    image: "/manus-storage/ab9f62d6-c299-43a5-b92d-8a77431aa741_fea61775.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 81",
    category: "Curtain",
    image: "/manus-storage/acce1f9a-e407-4a16-87ae-5bf8b7758892_017f863b.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 82",
    category: "Curtain",
    image: "/manus-storage/b273d7f4-4e4f-4406-9ea6-ab2bb1bbc13f_b36e53df.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 83",
    category: "Curtain",
    image: "/manus-storage/b79ba40d-c672-4686-9797-65e56c14126c_46d7a384.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 84",
    category: "Curtain",
    image: "/manus-storage/ba4e9ecb-c4be-499c-8252-9cca7859c8c6_8f407fe7.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 85",
    category: "Curtain",
    image: "/manus-storage/bc384433-437a-4f97-b5a5-94c04409f081_43cea487.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 86",
    category: "Curtain",
    image: "/manus-storage/c0eb9ac6-017c-40f9-904a-da2169dfbb9a_dac0434a.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 87",
    category: "Curtain",
    image: "/manus-storage/c1cec428-9bc0-4e3b-bf2f-c3ae4e102cc7_9bd45300.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 88",
    category: "Curtain",
    image: "/manus-storage/c3d70be7-208d-4889-b46d-5e5eff05fd85_fa2e3ac7.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 89",
    category: "Curtain",
    image: "/manus-storage/c5dd3657-dd25-4ec7-92ad-24a16f14ae9d_2ca27143.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 90",
    category: "Curtain",
    image: "/manus-storage/c6fdd320-b314-4ccf-9855-ab546851b642_ba617f21.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 91",
    category: "Curtain",
    image: "/manus-storage/cbc39c3a-9091-4162-b221-7c9bb840d698_f970f372.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 92",
    category: "Curtain",
    image: "/manus-storage/cc9bc715-8aab-45bf-8786-8f109e784842_e9dadf38.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 93",
    category: "Curtain",
    image: "/manus-storage/d2640195-08e2-46b9-a071-8e23fba86686_39f6fd4a.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 94",
    category: "Curtain",
    image: "/manus-storage/d3b409ac-f962-4595-a618-ed893131f1b4_3bb4013b.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 95",
    category: "Curtain",
    image: "/manus-storage/d4790721-2906-460f-8b04-25bf47a30774_9a24aeb7.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 96",
    category: "Curtain",
    image: "/manus-storage/d4f077cc-8e62-4ff9-b7f2-6f2dc64710a6_4b4fd51d.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 97",
    category: "Curtain",
    image: "/manus-storage/dbc195d6-e04a-4a8f-a185-65035a48372a_bb2eeacf.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 98",
    category: "Curtain",
    image: "/manus-storage/e1dda4db-9fb9-4577-85ea-68cdd969c6e7_d9b94870.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 99",
    category: "Curtain",
    image: "/manus-storage/e5289c38-9f22-4d6e-b4c1-8775771bfe27_4cd20688.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 100",
    category: "Curtain",
    image: "/manus-storage/e71bb5b0-49bb-458f-b396-3f1d5d3dfc67_adae33dc.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 101",
    category: "Curtain",
    image: "/manus-storage/e7992599-353c-4ce4-8365-746f95574131_60bf0c6b.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 102",
    category: "Curtain",
    image: "/manus-storage/e87b49f6-7895-4920-b382-7cde68ffa08a_51d3a07c.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 103",
    category: "Curtain",
    image: "/manus-storage/e988076e-c843-47fd-956f-9b220d6ec913_ad7653c4.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 104",
    category: "Curtain",
    image: "/manus-storage/e9d4aa05-e257-4c51-af68-38b1d1e8c242_06a2001a.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 105",
    category: "Curtain",
    image: "/manus-storage/eb00b71a-f3ad-4100-aec5-cda72fe08dfa_9dc51057.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 106",
    category: "Curtain",
    image: "/manus-storage/ecd88276-fb73-41cd-a663-ed4843264eeb_86a1a2e5.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 107",
    category: "Curtain",
    image: "/manus-storage/ede5efaa-dc61-448c-b0a8-edc8e490e2f3_09569894.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 108",
    category: "Curtain",
    image: "/manus-storage/edea6180-8347-4c97-b1f7-069419303c22_4a07c7c1.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 109",
    category: "Curtain",
    image: "/manus-storage/f5ad83cb-d1e1-451e-88c7-43a64f61c3ab_6f032d93.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 110",
    category: "Curtain",
    image: "/manus-storage/f7f172fa-01e5-464d-b12b-bf28169814c5_cd900669.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 111",
    category: "Curtain",
    image: "/manus-storage/f82b6185-b05d-4bf4-8820-0ec54a8cd86d_a0f84eb7.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 112",
    category: "Curtain",
    image: "/manus-storage/f8b53078-5f37-41bc-9ec8-8de9c9e26603_54cacd6b.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 113",
    category: "Curtain",
    image: "/manus-storage/f9943158-b341-4f49-9f10-50dcbdc04100_be23f131.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 114",
    category: "Curtain",
    image: "/manus-storage/fc5faf78-a9fb-4a83-b17d-3c62f2e5d558_62bd339e.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 115",
    category: "Curtain",
    image: "/manus-storage/fc6cea1e-e952-47d8-aa3f-70a9b3c24b3a_c969222a.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Curtain 116",
    category: "Curtain",
    image: "/manus-storage/fee70e65-d3e5-4cb5-b965-1413217197a0_714e2201.JPG",
    description: "Custom curtain installation and styling project.",
  },
  {
    title: "Blind 1",
    category: "Blind",
    image: "/manus-storage/00275f90-b958-4f9b-8b3f-f381f6d8e5ce_d61b838c.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 2",
    category: "Blind",
    image: "/manus-storage/0cc5a74d-97e1-433c-ab69-48de557e4202_df4e4214.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 3",
    category: "Blind",
    image: "/manus-storage/26297a8a-e2c4-4053-959f-caab62ec135d_5a667138.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 4",
    category: "Blind",
    image: "/manus-storage/2635bc49-54dc-4a81-9163-02c86329fb3a_2f00248c.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 5",
    category: "Blind",
    image: "/manus-storage/2ca5bb36-3cca-4a72-b13c-fb1f71fb033d_4c83d138.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 6",
    category: "Blind",
    image: "/manus-storage/32942c29-ecb3-49f8-bea7-12be7327b4cf_cff16b24.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 7",
    category: "Blind",
    image: "/manus-storage/35b1f567-586f-4be4-8a58-be7d73cf8474_e790b356.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 8",
    category: "Blind",
    image: "/manus-storage/3c339340-430d-4d49-8e43-538bcfd7ad01_9ee1fb64.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 9",
    category: "Blind",
    image: "/manus-storage/4180fa4b-bb27-4864-81c2-57217ef8105a_1af42208.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 10",
    category: "Blind",
    image: "/manus-storage/41c020da-42b0-45c6-b375-98f8c36f3283_4f6f7578.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 11",
    category: "Blind",
    image: "/manus-storage/44f5ffa8-fb3d-4463-86c4-991af5b83466_48ef41a0.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 12",
    category: "Blind",
    image: "/manus-storage/47b3f128-2fb0-4da7-9f6e-3c0901f8034f_c5495121.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 13",
    category: "Blind",
    image: "/manus-storage/49e3bf40-50c3-414b-b724-49d2e0208c00_b0f6ef55.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 14",
    category: "Blind",
    image: "/manus-storage/502ced81-b0bd-4943-9671-5aca84d6050d_9cecb3ab.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 15",
    category: "Blind",
    image: "/manus-storage/5413bb0e-1836-4275-a505-1c96fbb90d1d_ed91f239.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 16",
    category: "Blind",
    image: "/manus-storage/7061ec9b-aab9-45ac-bbbd-1b206671b0f5_ecdd4c9a.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 17",
    category: "Blind",
    image: "/manus-storage/720897f8-640c-4a71-a924-696529509f81_f10966ad.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 18",
    category: "Blind",
    image: "/manus-storage/75677636-cfaf-44e4-bafc-690dc8bd6190_c2e33bc7.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 19",
    category: "Blind",
    image: "/manus-storage/75aaffab-f621-49c7-976e-83add7467311_55523a9b.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 20",
    category: "Blind",
    image: "/manus-storage/9d14fc62-80a5-4d55-8a89-0f163d7ef4c7_63db036d.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 21",
    category: "Blind",
    image: "/manus-storage/a7c97087-45cc-47ed-9b4f-175297fb1a20_caa5725d.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 22",
    category: "Blind",
    image: "/manus-storage/b0e0be16-af77-4c83-b8ba-4697798ced26_c089830d.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 23",
    category: "Blind",
    image: "/manus-storage/baadaa97-86bb-4295-85da-e6704772695a_0aed87ee.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 24",
    category: "Blind",
    image: "/manus-storage/bb6d48c3-a63a-437e-988f-ec311d9cb8f0_642b3e1a.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 25",
    category: "Blind",
    image: "/manus-storage/bd1afd7d-80c5-4f34-aa2b-7e741fecdd99_5358534b.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 26",
    category: "Blind",
    image: "/manus-storage/c04a0673-3a39-4960-81e0-b935f5254bae_c6838d0f.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 27",
    category: "Blind",
    image: "/manus-storage/c3282471-9080-4575-8ab5-088c76d625bb_900f75d5.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 28",
    category: "Blind",
    image: "/manus-storage/c931f266-6a58-4682-a689-c1768a6e02e8_4142423a.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 29",
    category: "Blind",
    image: "/manus-storage/c97c299f-7545-490f-8a2a-e83bb8569feb_683b45ee.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 30",
    category: "Blind",
    image: "/manus-storage/cbb581d2-0ac2-4cf5-8139-2e9101cafdfb_b9e0c711.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 31",
    category: "Blind",
    image: "/manus-storage/cd34e579-fe7e-4e5b-92cf-93495c2684d9_84a4a132.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 32",
    category: "Blind",
    image: "/manus-storage/d0e004ee-74ae-4fc8-8f91-65808d6bc5be_58714def.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 33",
    category: "Blind",
    image: "/manus-storage/e31eb6d5-f6d5-44c9-80d2-909d22e2188c_e5078cc6.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 34",
    category: "Blind",
    image: "/manus-storage/e45f0c2e-502e-45ea-a9fa-d23078606da5_1ee9448e.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 35",
    category: "Blind",
    image: "/manus-storage/e791d161-5fc2-44ae-9289-1765fde91be2_273acb82.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 36",
    category: "Blind",
    image: "/manus-storage/eb9d75b0-6b87-46a7-bd20-eb3984dfc5f2_007fd4d7.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 37",
    category: "Blind",
    image: "/manus-storage/ee556e93-f810-4a57-8e18-299bb51917ec_9a298aca.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 38",
    category: "Blind",
    image: "/manus-storage/f2344c04-bc3f-4c04-a784-d07b5b6daf52_80be51b7.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Blind 39",
    category: "Blind",
    image: "/manus-storage/f2958902-f6b0-4039-a9ed-2caab52dd98b_df311e85.JPG",
    description: "Professional blind installation and design project.",
  },
  {
    title: "Wallpaper 1",
    category: "Wallpaper",
    image: "/manus-storage/0deb41f8-e9ef-45d6-b770-1ef30ecfcf58_0df11450.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 2",
    category: "Wallpaper",
    image: "/manus-storage/21e83cf0-20c9-4d04-8b28-166cc669ca31_fb54e6c1.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 3",
    category: "Wallpaper",
    image: "/manus-storage/51123157-31ee-4161-bdf3-7ba9aa834884_35436b25.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 4",
    category: "Wallpaper",
    image: "/manus-storage/6d8fc5a5-57bc-417c-9239-ae84c3d09007_afe9c1f0.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 5",
    category: "Wallpaper",
    image: "/manus-storage/aca7b1c8-aaa9-4d11-bfcb-14a881849b44_66717b8e.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 6",
    category: "Wallpaper",
    image: "/manus-storage/b0e0be16-af77-4c83-b8ba-4697798ced26_3681bddc.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 7",
    category: "Wallpaper",
    image: "/manus-storage/d924aceb-d653-49f8-8195-7cf875fd97cc_441d2a81.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 8",
    category: "Wallpaper",
    image: "/manus-storage/0deb41f8-e9ef-45d6-b770-1ef30ecfcf58_fb387fce.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 9",
    category: "Wallpaper",
    image: "/manus-storage/21e83cf0-20c9-4d04-8b28-166cc669ca31_8800a6e4.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 10",
    category: "Wallpaper",
    image: "/manus-storage/51123157-31ee-4161-bdf3-7ba9aa834884_e1db28c4.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 11",
    category: "Wallpaper",
    image: "/manus-storage/6d8fc5a5-57bc-417c-9239-ae84c3d09007_e896e5a5.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 12",
    category: "Wallpaper",
    image: "/manus-storage/aca7b1c8-aaa9-4d11-bfcb-14a881849b44_0d408c82.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 13",
    category: "Wallpaper",
    image: "/manus-storage/b0e0be16-af77-4c83-b8ba-4697798ced26_6c186d90.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
  {
    title: "Wallpaper 14",
    category: "Wallpaper",
    image: "/manus-storage/d924aceb-d653-49f8-8195-7cf875fd97cc_c284e868.JPG",
    description: "Beautiful wallpaper design and installation project.",
  },
];



const CTA_COPY = "Book a free consultation and let us help you choose the right curtain, blind, wallpaper, or reupholstery finish for your space.";

function usePageMeta(pathname: string) {
  const meta = PAGE_META[pathname] ?? PAGE_META["/"];

  useEffect(() => {
    document.title = meta.title;

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", meta.description);
  }, [meta.description, meta.title]);
}

function FadeIn({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

function SectionIntro({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="max-w-3xl space-y-5">
      <p className="text-xs font-semibold uppercase tracking-[0.36em] text-primary/80">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-none text-foreground md:text-6xl">{title}</h2>
      <p className="max-w-2xl text-base leading-8 text-foreground/72 md:text-lg">{body}</p>
    </div>
  );
}

function TopNavigation() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container py-4">
        <div className="rounded-full border border-white/20 bg-[rgba(34,22,15,0.66)] px-4 py-3 text-white shadow-[0_24px_80px_rgba(29,18,12,0.28)] backdrop-blur-xl md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="min-w-0">
              <span className="block font-display text-2xl leading-none tracking-[0.04em] text-white">{BUSINESS_NAME}</span>
            </Link>

            <nav className="hidden items-center gap-7 lg:flex">
              {NAV_ITEMS.map((item) => {
                const active = location === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "link-underline text-sm tracking-[0.18em] text-white/78 transition-colors duration-300 hover:text-white",
                      active && "text-white",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <Button asChild className="hidden rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-primary/20 transition-transform duration-300 hover:-translate-y-0.5 md:inline-flex">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  Book a Free Consultation
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-white/25 bg-white/10 text-white hover:bg-white/16 hover:text-white lg:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.24 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="mt-4 space-y-3 border-t border-white/12 pt-4">
                  {NAV_ITEMS.map((item) => {
                    const active = location === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "block rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.24em] text-white/78 transition-colors duration-300 hover:bg-white/10 hover:text-white",
                          active && "bg-white/10 text-white",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                  <Button asChild className="mt-2 w-full rounded-full bg-primary text-primary-foreground">
                    <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                      Book a Free Consultation
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_44px_rgba(37,211,102,0.35)] transition-transform duration-300 hover:-translate-y-1"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp Us</span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/70 py-10">
      <div className="container grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.36em] text-primary/80">{BUSINESS_NAME}</p>
          <h3 className="font-display text-3xl text-foreground">Warm, tailored curtains for everyday living.</h3>
          <p className="max-w-xl text-sm leading-7 text-foreground/68">
            From free home measurement to final installation, we help families and small businesses create spaces that feel more finished, private, and beautifully lived in.
          </p>
        </div>
        <div className="space-y-3 text-sm leading-7 text-foreground/72 md:text-right">
          <p>{ADDRESS}</p>
          <p>
            <a className="hover:text-primary" href={`tel:${PHONE_NUMBER.replace("+", "")}`}>
              {PHONE_NUMBER}
            </a>
          </p>
          <p>
            <a className="hover:text-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              WhatsApp Consultation
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  usePageMeta(location);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <TopNavigation />
      <FloatingWhatsApp />
      <div className="grain-overlay pointer-events-none fixed inset-0 z-0 opacity-40" />
      <main className="relative z-10 pt-[5.5rem]">{children}</main>
      <Footer />
    </div>
  );
}

function HeroSection() {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <img
        src={HERO_FALLBACK_IMAGE}
        alt="Elegant living room with full-height curtains"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!videoFailed && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_FALLBACK_IMAGE}
          onError={() => setVideoFailed(true)}
          aria-label="Curtain and living space video background"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.45)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_32%),linear-gradient(180deg,rgba(26,15,10,0.12),rgba(26,15,10,0.45)_72%,rgba(26,15,10,0.8))]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-4xl space-y-8 text-center text-white"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-white/75">Custom measurement, styling & installation</p>
          <h1 className="font-display text-5xl leading-[0.95] text-white md:text-7xl lg:text-8xl">
            Curtains that make a room feel finished, warm, and quietly luxurious.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-8 text-white/80 md:text-lg">
            {TAGLINE}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full bg-primary px-8 text-primary-foreground shadow-[0_20px_40px_rgba(160,82,45,0.32)] transition-transform duration-300 hover:-translate-y-0.5">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Book a Free Consultation
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-white/10 px-8 text-white backdrop-blur hover:bg-white/18 hover:text-white">
              <Link href="/gallery">View Our Work</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="relative -mt-16 pb-12">
      <div className="container">
        <div className="grid gap-4 rounded-[2rem] border border-border/60 bg-card/90 p-6 shadow-[0_30px_90px_rgba(59,37,25,0.12)] backdrop-blur md:grid-cols-4 md:p-8">
          {[
            "Free home measurement",
            "Fabric & design guidance",
            "Custom made for your windows",
            "Professional installation",
          ].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-border/60 bg-background/75 px-5 py-6 text-sm uppercase tracking-[0.24em] text-foreground/72">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <FadeIn className="warm-surface py-20 md:py-28">
      <div className="container space-y-12">
        <SectionIntro
          eyebrow="What we offer"
          title="Measured, made, and installed with care."
          body="We focus on the full service journey so you do not have to coordinate separate measuring, sourcing, and installation steps on your own."
        />
        <div className="grid gap-5 lg:grid-cols-4">
          {SERVICE_ITEMS.map((service) => (
            <div key={service.title} className="rounded-[1.8rem] border border-border/70 bg-card/85 p-7 shadow-[0_24px_70px_rgba(58,36,25,0.08)] transition-transform duration-300 hover:-translate-y-1.5">
              <service.icon className="mb-7 h-7 w-7 text-primary" />
              <h3 className="font-display text-3xl leading-none text-foreground">{service.title}</h3>
              <p className="mt-5 text-sm leading-7 text-foreground/72">{service.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.24em] text-primary/80">{service.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function OurWorkPreview() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>("All");
  const categories = useMemo<WorkCategory[]>(() => ["All", "Curtain", "Blind", "Wallpaper"], []);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return WORK_ITEMS;
    }
    return WORK_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <FadeIn className="py-20 md:py-24">
      <div className="container space-y-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionIntro
            eyebrow="Our work"
            title="Browse the finishes we design and install."
            body="Explore the main categories we handle for homes, retail spaces, offices, and semi-outdoor areas."
          />
          <Button asChild variant="outline" className="rounded-full border-primary/25 bg-transparent px-6 text-primary hover:bg-primary/8">
            <Link href="/gallery">
              View full gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full border px-5 py-3 text-xs font-semibold uppercase tracking-[0.26em] transition-all duration-300",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/15"
                    : "border-border/70 bg-card/80 text-foreground/72 hover:border-primary/40 hover:text-primary",
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {filteredItems.map((item) => (
              <article key={`${item.category}-${item.title}`} className="overflow-hidden rounded-[1.9rem] border border-border/70 bg-card/85 shadow-[0_24px_70px_rgba(58,36,25,0.08)]">
                <div className="relative h-72 overflow-hidden bg-[#ddd2c6]">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,12,9,0.02),rgba(18,12,9,0.24))]" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-foreground">{item.category}</span>
                </div>
                <div className="space-y-4 p-6">
                  <h3 className="font-display text-3xl leading-none text-foreground">{item.title}</h3>
                  <p className="text-sm leading-7 text-foreground/70">{item.description}</p>
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

function ProcessPreview() {
  return (
    <FadeIn className="warm-surface py-20 md:py-28">
      <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <SectionIntro
          eyebrow="How it works"
          title="A clear four-step process from consultation to installation."
          body="The journey is kept simple, transparent, and personal so every decision feels guided rather than overwhelming."
        />
        <div className="space-y-5">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="grid gap-5 rounded-[1.8rem] border border-border/70 bg-card/85 p-6 shadow-sm md:grid-cols-[auto_1fr] md:items-start">
              <div className="font-display text-4xl leading-none text-primary">{step.number}</div>
              <div className="space-y-2">
                <h3 className="font-display text-3xl leading-none text-foreground">{step.title}</h3>
                <p className="text-sm leading-7 text-foreground/72">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

function ClosingCta() {
  return (
    <FadeIn className="pb-24 pt-8 md:pb-28">
      <div className="container">
        <div className="overflow-hidden rounded-[2.2rem] border border-border/70 bg-[linear-gradient(135deg,rgba(160,82,45,0.12),rgba(245,240,234,0.92)_42%,rgba(201,180,154,0.24))] px-6 py-10 shadow-[0_34px_80px_rgba(59,37,25,0.12)] md:px-12 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.36em] text-primary/80">Free consultation</p>
              <h2 className="font-display text-4xl leading-none text-foreground md:text-6xl">Let us help you dress the room beautifully.</h2>
              <p className="max-w-2xl text-base leading-8 text-foreground/72">{CTA_COPY}</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <Button asChild size="lg" className="rounded-full bg-primary px-8 text-primary-foreground">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  Book on WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary/25 bg-transparent px-8 text-primary hover:bg-primary/8">
                <Link href="/contact">Contact Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

function PageHero({ eyebrow, title, body, image }: { eyebrow: string; title: string; body: string; image: string }) {
  return (
    <section className="pb-14 pt-10 md:pb-20 md:pt-14">
      <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.36em] text-primary/80">{eyebrow}</p>
          <h1 className="font-display text-5xl leading-[0.95] text-foreground md:text-7xl">{title}</h1>
          <p className="max-w-2xl text-base leading-8 text-foreground/72 md:text-lg">{body}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Book a Free Consultation
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-primary/25 bg-transparent px-6 text-primary hover:bg-primary/8">
              <a href={`tel:${PHONE_NUMBER.replace("+", "")}`}>
                <PhoneCall className="mr-2 h-4 w-4" />
                {PHONE_NUMBER}
              </a>
            </Button>
          </div>
        </div>
        <div className="editorial-frame overflow-hidden rounded-[2rem] bg-[#dcccb8] p-3 shadow-[0_32px_90px_rgba(64,40,24,0.16)]">
          <img src={image} alt={title} className="h-[520px] w-full rounded-[1.45rem] object-cover" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function LocationShowcase() {
  const [mapReady, setMapReady] = useState(false);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-[1.8rem] border border-border/70 bg-card/85 p-7 shadow-[0_24px_70px_rgba(58,36,25,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/78">Visit or call us</p>
        <h2 className="mt-4 font-display text-4xl leading-none text-foreground">Contact details</h2>
        <div className="mt-8 space-y-6 text-sm leading-7 text-foreground/74">
          <div className="flex gap-4">
            <PhoneCall className="mt-1 h-5 w-5 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-primary/76">Phone</p>
              <a href={`tel:${PHONE_NUMBER.replace("+", "")}`} className="text-base hover:text-primary">
                {PHONE_NUMBER}
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <MessageCircle className="mt-1 h-5 w-5 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-primary/76">WhatsApp</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-base hover:text-primary">
                Start a consultation chat
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin className="mt-1 h-5 w-5 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-primary/76">Address</p>
              <p className="text-base">{ADDRESS}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock3 className="mt-1 h-5 w-5 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-primary/76">Appointments</p>
              <p className="text-base">Consultations are arranged directly by phone or WhatsApp.</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="rounded-full bg-primary text-primary-foreground">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Book on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-full border-primary/25 bg-transparent text-primary hover:bg-primary/8">
            <a href={MAPS_URL} target="_blank" rel="noreferrer">
              Open in Google Maps
            </a>
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-[1.8rem] border border-border/70 bg-card/85 p-3 shadow-[0_24px_70px_rgba(58,36,25,0.08)]">
        <MapView
          className="h-[520px] rounded-[1.45rem]"
          initialCenter={{ lat: 5.4245, lng: 100.3174 }}
          initialZoom={15}
          onMapReady={(map) => {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: ADDRESS }, (results, status) => {
              if (status === "OK" && results?.[0]) {
                const position = results[0].geometry.location;
                map.setCenter(position);
                new window.google.maps.marker.AdvancedMarkerElement({
                  map,
                  position,
                  title: BUSINESS_NAME,
                });
                setMapReady(true);
              }
            });
          }}
        />
        <div className="mt-3 px-2 text-xs uppercase tracking-[0.24em] text-foreground/58">
          {mapReady ? "Map positioned for the George Town location" : "Loading map for the exact location"}
        </div>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesPreview />
      <ProcessPreview />
      <ClosingCta />
    </>
  );
}

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>("All");
  const [selectedImage, setSelectedImage] = useState<WorkItem | null>(null);
  const [displayCount, setDisplayCount] = useState(6);
  const categories = useMemo<WorkCategory[]>(() => ["All", "Curtain", "Blind", "Wallpaper"], []);
  const ITEMS_PER_PAGE = 6;

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return WORK_ITEMS;
    }
    return WORK_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const displayedItems = useMemo(() => {
    return filteredItems.slice(0, displayCount);
  }, [filteredItems, displayCount]);

  const handleCategoryChange = (category: WorkCategory) => {
    setActiveCategory(category);
    setDisplayCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const hasMoreItems = displayCount < filteredItems.length;

  return (
    <>
      <FadeIn className="pb-24 pt-10 md:pb-28 md:pt-14">
        <div className="container space-y-10">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.36em] text-primary/80">Gallery / Our Work</p>
            <h1 className="font-display text-5xl leading-[0.95] text-foreground md:text-7xl">Browse our furnishing categories.</h1>
            <p className="max-w-2xl text-base leading-8 text-foreground/72 md:text-lg">
              Explore curtain, blind, and wallpaper work through the same category-based presentation used on the homepage.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={cn(
                    "rounded-full border px-5 py-3 text-xs font-semibold uppercase tracking-[0.26em] transition-all duration-300",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/15"
                      : "border-border/70 bg-card/80 text-foreground/72 hover:border-primary/40 hover:text-primary",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
              className="space-y-8"
            >
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {displayedItems.map((item) => (
                <button
                  key={`${item.category}-${item.title}`}
                  type="button"
                  onClick={() => setSelectedImage(item)}
                  className="group relative overflow-hidden rounded-[1.9rem] border border-border/70 bg-card/85 shadow-[0_24px_70px_rgba(58,36,25,0.08)]"
                  aria-label={`Open full view of ${item.title}`}
                >
                  <div className="relative h-[22rem] overflow-hidden bg-[#ddd2c6]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,12,9,0.02),rgba(18,12,9,0.18))] transition-opacity duration-300 group-hover:opacity-70" />
                  </div>
                </button>
              ))}
              </div>
              {hasMoreItems && (
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleLoadMore}
                    variant="outline"
                    className="rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em]"
                  >
                    Load More
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </FadeIn>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/88 px-4 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute right-5 top-5 z-10 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20"
              aria-label="Close full image view"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="relative max-h-full w-full max-w-6xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-h-[85vh] w-full rounded-[1.6rem] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ClosingCta />
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="A full service designed around comfort, style, and fit."
        body="We do not simply sell curtain pieces. We guide the decision, tailor the finish, and install the final result so the room feels complete."
        image={OFFICE_IMAGE}
      />
      <FadeIn className="pb-12">
        <div className="container grid gap-6 lg:grid-cols-2">
          {SERVICE_ITEMS.map((service) => (
            <div key={service.title} className="rounded-[1.9rem] border border-border/70 bg-card/85 p-8 shadow-[0_24px_70px_rgba(58,36,25,0.08)]">
              <service.icon className="h-7 w-7 text-primary" />
              <h2 className="mt-6 font-display text-4xl leading-none text-foreground">{service.title}</h2>
              <p className="mt-5 text-base leading-8 text-foreground/72">{service.description}</p>
              <p className="mt-4 text-sm leading-7 text-primary/80">{service.detail}</p>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn className="warm-surface py-20 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="editorial-frame overflow-hidden rounded-[2rem] bg-[#dcccb8] p-3 shadow-[0_32px_90px_rgba(64,40,24,0.16)]">
            <img src={CONSULTATION_IMAGE} alt="Fabric and design consultation" className="h-[480px] w-full rounded-[1.45rem] object-cover" loading="lazy" />
          </div>
          <div className="space-y-6">
            <SectionIntro
              eyebrow="Why clients choose this approach"
              title="Guidance that makes selection simpler."
              body="For many homeowners, the hardest part is not installation. It is knowing what fabric, fullness, layering, and tone will actually suit the room. That is where our consultation-first service adds value."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Recommendations based on light, privacy, and room mood",
                "A cleaner end result because measurement and installation are handled together",
                "Suitable for both homes and small office interiors",
                "No shopping cart, no price table, just direct service guidance",
              ].map((point) => (
                <div key={point} className="rounded-[1.4rem] border border-border/70 bg-card/80 p-5 text-sm leading-7 text-foreground/72 shadow-sm">
                  <Sparkles className="mb-4 h-4 w-4 text-primary" />
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
      <ClosingCta />
    </>
  );
}

export function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="How It Works"
        title="A calm, guided process from first call to final installation."
        body="The experience is built to feel straightforward and personal, with clear stages that help clients know exactly what comes next."
        image={BEDROOM_IMAGE}
      />
      <FadeIn className="pb-16">
        <div className="container grid gap-6 lg:grid-cols-2">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="rounded-[1.9rem] border border-border/70 bg-card/85 p-8 shadow-[0_24px_70px_rgba(58,36,25,0.08)]">
              <div className="flex items-end justify-between gap-4 border-b border-border/70 pb-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-primary/76">Step {step.number}</p>
                  <h2 className="mt-3 font-display text-4xl leading-none text-foreground">{step.title}</h2>
                </div>
                <ChevronRight className="h-6 w-6 text-primary/65" />
              </div>
              <p className="mt-6 text-base leading-8 text-foreground/72">{step.body}</p>
            </div>
          ))}
        </div>
      </FadeIn>
      <FadeIn className="warm-surface py-20 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="space-y-6">
            <SectionIntro
              eyebrow="Service flow"
              title="Luxury in feel, simple in process."
              body="The requested reference direction emphasised trust and booking clarity. This page supports that by turning the service journey into a concise visual story rather than a dense block of text."
            />
            <div className="rounded-[1.8rem] border border-border/70 bg-card/85 p-7 shadow-sm">
              <p className="text-sm leading-7 text-foreground/72">
                The first step is always a conversation. Once we understand your space and needs, the rest of the process becomes easier to tailor, easier to schedule, and easier to finish beautifully.
              </p>
            </div>
          </div>
          <div className="editorial-frame overflow-hidden rounded-[2rem] bg-[#e5d7c8] p-3 shadow-[0_32px_90px_rgba(64,40,24,0.16)]">
            <img src={OFFICE_IMAGE} alt="Professional installation process inspiration" className="h-[480px] w-full rounded-[1.45rem] object-cover" loading="lazy" />
          </div>
        </div>
      </FadeIn>
      <ClosingCta />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach us directly for a free curtain consultation."
        body="The contact page stays intentionally simple, as requested: WhatsApp, phone number, and map location only."
        image={SHADE_ROOM_STOCK}
      />
      <FadeIn className="pb-24 md:pb-28">
        <div className="container">
          <LocationShowcase />
        </div>
      </FadeIn>
    </>
  );
}
