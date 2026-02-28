export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "SXSW 2026",
    image: "/images/event1.png",
    slug: "sxsw-2026",
    location: "Austin, TX",
    date: "March 12-18, 2026",
    time: "All Day",
  },
  {
    title: "GDC Festival of Gaming 2026",
    image: "/images/event2.png",
    slug: "gdc-festival-of-gaming-2026",
    location: "San Francisco, CA",
    date: "March 9-13, 2026",
    time: "All Day",
  },
  {
    title: "KubeCon + CloudNativeCon Europe 2026",
    image: "/images/event3.png",
    slug: "kubecon-cloudnativecon-europe-2026",
    location: "Amsterdam, Netherlands",
    date: "March 23-26, 2026",
    time: "All Day",
  },
  {
    title: "Google Cloud Next 2026",
    image: "/images/event4.png",
    slug: "google-cloud-next-2026",
    location: "Las Vegas, NV",
    date: "April 22-24, 2026",
    time: "9:00 AM",
  },
  {
    title: "PyCon US 2026",
    image: "/images/event5.png",
    slug: "pycon-us-2026",
    location: "Long Beach, CA",
    date: "May 13-19, 2026",
    time: "All Day",
  },
  {
    title: "Open Source Summit North America 2026",
    image: "/images/event6.png",
    slug: "open-source-summit-north-america-2026",
    location: "Minneapolis, MN",
    date: "May 18-20, 2026",
    time: "All Day",
  },
  {
    title: "Black Hat USA 2026",
    image: "/images/events-full.png",
    slug: "black-hat-usa-2026",
    location: "Las Vegas, NV",
    date: "August 4-6, 2026",
    time: "10:00 AM",
  },
];
