import Link from "next/link"
import { ArrowUpRight, Linkedin, Mail, Send } from "lucide-react"

import { NotionContent } from "@/components/notion-block-renderer"
import { FloatingSectionNav } from "@/components/floating-section-nav"
import { FadeIn, Stagger, StaggerItem } from "@/components/motion"
import { getSelectedWorkItems } from "@/lib/notion"

const experience = [
  {
    years: "2023 — Present",
    title: "Product Designer @ BI Group",
    note: "Ranked #1 in real estate sales volume among Middle Eastern and CIS countries.",
    href: "https://bi.group/"
  },
  {
    years: "2022 — 2023",
    title: "Product Designer @ Beeline",
    note: "Beeline Kazakhstan is a leading digital telecom operator connecting over 11 million mobile subscribers nationwide.",
    href: "https://apps.apple.com/kz/app/janymda-beeline-%D0%BA%D0%B0%D0%B7%D0%B0%D1%85%D1%81%D1%82%D0%B0%D0%BD/id711280776"
  },
  {
    years: "2022",
    title: "Product Designer @ Petrel AI",
    note: "NDA project for a global #1 leader in the uranium industry."
  },
  {
    years: "2020 — 2022",
    title: "Product Designer @ Technodom Operator",
    note: "Largest e-com in Kazakhstan",
    href: "https://apps.apple.com/gb/app/technodom-kz-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD/id1435756761"
  },
  {
    years: "2020",
    title: "UI/UX Designer @ Vlife",
    note: "CMS for superapp Vlife",
    href: "https://apps.apple.com/kz/app/vlife-%D0%B0%D0%B7%D1%81-%D0%BF%D0%B0%D1%80%D1%82%D0%BD%D0%B5%D1%80%D1%8B-%D0%B1%D0%B0%D0%BB%D0%BB%D1%8B/id1527733098"
  }
]

const principles = [
  "Start with the problem",
  "Design clear flows, not decorative screens",
  "Keep systems scalable and simple"
]

const selectedWorkPageId = "31725685-1722-8035-ac20-cd8311aec051"

export const revalidate = 3600

async function getNotionProjects() {
  try {
    return await getSelectedWorkItems(selectedWorkPageId)
  } catch {
    return []
  }
}

export default async function HomePage() {
  const notionProjects = await getNotionProjects()

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Link
        href="#main"
        className="absolute left-5 top-5 z-40 flex h-[46px] items-center text-sm tracking-tight text-white/90 transition hover:text-white sm:left-8 sm:top-6"
      >
        Myrzan Izimbetov
      </Link>
      <FloatingSectionNav />

      <main id="main" className="mx-auto max-w-7xl px-6 pb-40 pt-20 sm:px-8 sm:pt-24 md:pb-24 md:pt-28">
        <section id="intro">
          <FadeIn>
            <div className="py-[4.75rem] sm:py-16 md:py-20">
              <h1 className="max-w-[14ch] text-[2rem] font-medium leading-[2.35rem] tracking-tight text-white sm:max-w-none">
                Hello, I&apos;m Myrzan
              </h1>
              <p className="mt-5 max-w-[18ch] text-lg leading-7 text-white/86 sm:mt-6 sm:max-w-5xl">
                A product designer with 6+ years of experience building high-traffic apps and
                simplifying complex systems into elegant user journeys. Currently designing at{" "}
                <Link
                  href="https://bi.global/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-[0.14em] align-[-0.08em] whitespace-nowrap text-white opacity-100"
                  style={{
                    cursor: 'url("/cursors/worker.svg") 5 27, pointer'
                  }}
                >
                  <span className="sr-only">BI Group</span>
                  <svg
                    viewBox="0 0 115 28"
                    aria-hidden="true"
                    className="relative -top-[1px] h-[calc(0.72em+4px)] w-auto shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_bi_wordmark)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M32.1212 13.9999C32.1212 16.043 31.8448 18.0848 31.2864 20.128C30.3714 23.506 27.2724 26.4931 23.3055 27.268C20.9046 27.7379 18.4982 27.9763 16.0931 27.9763C13.6881 27.9763 11.2858 27.7393 8.88488 27.268C4.91241 26.4931 1.81348 23.506 0.89846 20.128C0.345575 18.0848 0.067749 16.043 0.067749 13.9999C0.067749 11.9567 0.344193 9.91492 0.89846 7.87175C1.81348 4.49373 4.91241 1.5066 8.88488 0.731752C11.2858 0.261851 13.6922 0.0234375 16.0931 0.0234375C18.494 0.0234375 20.9046 0.260465 23.3055 0.731752C27.2724 1.5066 30.3727 4.49373 31.2864 7.87175C31.8448 9.91492 32.1212 11.9567 32.1212 13.9999Z" fill="white" />
                      <path d="M45.6448 21.9498C44.4478 21.9498 43.36 21.7488 42.3814 21.3454C41.4028 20.9435 40.5666 20.3862 39.8741 19.6765C39.1802 18.9668 38.6439 18.1324 38.2638 17.1732C37.8837 16.214 37.6943 15.1716 37.6943 14.0433V14.0003C37.6943 12.9316 37.8878 11.9141 38.2749 10.948C38.6619 9.98187 39.2051 9.13633 39.9059 8.41137C40.6067 7.68642 41.4415 7.11256 42.4132 6.68702C43.3835 6.26286 44.4464 6.05078 45.5992 6.05078C46.271 6.05078 46.8805 6.09791 47.4279 6.19355C47.9752 6.2892 48.4825 6.42504 48.9497 6.59969C49.4169 6.77573 49.8592 6.99197 50.2738 7.24702C50.5323 7.40643 50.788 7.58108 51.0382 7.77237C51.2925 7.96504 51.3312 8.32682 51.1267 8.57078L50.1273 9.76563C49.9393 9.99019 49.609 10.029 49.3754 9.85157C49.2137 9.72959 49.0506 9.61593 48.8847 9.50781C48.5779 9.30959 48.2572 9.13771 47.9213 8.99217C47.5854 8.84662 47.2164 8.73573 46.8155 8.66227C46.4147 8.5888 45.9724 8.55138 45.4914 8.55138C44.7906 8.55138 44.1368 8.69415 43.5314 8.97969C42.926 9.26524 42.3994 9.65336 41.9543 10.144C41.5092 10.6347 41.1582 11.21 40.9038 11.8684C40.6481 12.5268 40.521 13.2227 40.521 13.9545V13.9989C40.521 14.789 40.6454 15.5223 40.8928 16.1945C41.1402 16.8682 41.4954 17.4462 41.9557 17.93C42.416 18.4137 42.9633 18.7949 43.5978 19.0722C44.2322 19.3508 44.944 19.4894 45.7333 19.4894C46.4631 19.4894 47.1459 19.3827 47.7803 19.1706C48.3111 18.9932 48.7838 18.7672 49.1971 18.4914C49.3478 18.3916 49.4335 18.2169 49.4335 18.0353V15.4696H46.0664C45.7609 15.4696 45.5135 15.2215 45.5135 14.9151V13.6524C45.5135 13.346 45.7609 13.0979 46.0664 13.0979H51.4874C51.7929 13.0979 52.0403 13.346 52.0403 13.6524V19.2898C52.0403 19.4575 51.9671 19.6183 51.8371 19.7236C51.5123 19.9856 51.1612 20.2365 50.7811 20.4777C50.3208 20.7716 49.8246 21.0266 49.2925 21.247C48.7589 21.466 48.1867 21.6393 47.573 21.7627C46.9593 21.8874 46.3179 21.9498 45.6462 21.9498H45.6448Z" fill="white" />
                      <path d="M54.6678 6.86891C54.6678 6.56257 54.9153 6.31445 55.2207 6.31445H61.5001C62.4635 6.31445 63.3177 6.4503 64.0627 6.72059C64.8077 6.99089 65.4284 7.36792 65.9246 7.85168C66.3337 8.27723 66.6475 8.76792 66.8659 9.32376C67.0843 9.8796 67.1948 10.495 67.1948 11.1687V11.2131C67.1948 12.4717 66.8548 13.4863 66.1761 14.2543C65.6468 14.8531 64.9999 15.3119 64.2369 15.6307C63.9038 15.7693 63.7766 16.1727 63.9853 16.4665L67.076 20.8121C67.3372 21.1794 67.076 21.6881 66.6267 21.6881H64.7884C64.6087 21.6881 64.4401 21.6008 64.3364 21.4539L60.9002 16.565C60.7966 16.418 60.6279 16.3307 60.4483 16.3307H57.3618V21.135C57.3618 21.4414 57.1144 21.6895 56.8089 21.6895H55.2207C54.9153 21.6895 54.6678 21.4414 54.6678 21.135V6.8703V6.86891ZM61.3025 13.9341C62.2659 13.9341 63.033 13.704 63.6011 13.2424C64.1706 12.7808 64.4553 12.1556 64.4553 11.3642V11.3212C64.4553 10.4867 64.1775 9.85327 63.6232 9.42218C63.0689 8.9897 62.288 8.77485 61.2803 8.77485H57.9133C57.6078 8.77485 57.3604 9.02297 57.3604 9.3293V13.3824C57.3604 13.6887 57.6078 13.9368 57.9133 13.9368H61.3025V13.9341Z" fill="white" />
                      <path d="M76.938 21.9504C75.7549 21.9504 74.6754 21.7411 73.6967 21.3252C72.7181 20.908 71.8791 20.3411 71.1783 19.623C70.4776 18.9064 69.9302 18.0678 69.5363 17.1086C69.1423 16.1494 68.9447 15.1292 68.9447 14.0452V14.0022C68.9447 12.9183 69.141 11.8981 69.5363 10.9389C69.9302 9.97966 70.4845 9.13828 71.2005 8.41333C71.9151 7.68838 72.7624 7.11452 73.741 6.68897C74.7182 6.26481 75.7991 6.05273 76.9822 6.05273C78.1654 6.05273 79.2449 6.26204 80.2235 6.67788C81.2021 7.09511 82.0411 7.66204 82.7419 8.38006C83.4427 9.09808 83.9901 9.93531 84.384 10.8945C84.7779 11.8537 84.9756 12.8739 84.9756 13.9579V14.0022C84.9756 15.0862 84.7793 16.1064 84.384 17.0656C83.9901 18.0248 83.4358 18.8662 82.7198 19.5912C82.0038 20.3161 81.1579 20.8914 80.1793 21.3155C79.2007 21.7397 78.1212 21.9531 76.938 21.9531V21.9504ZM76.9809 19.447C77.7397 19.447 78.4377 19.3042 79.0722 19.0187C79.708 18.7331 80.2512 18.3492 80.7032 17.8654C81.1552 17.3816 81.5104 16.8119 81.7647 16.1521C82.0204 15.4937 82.149 14.791 82.149 14.0438V14.0009C82.149 13.2537 82.0204 12.5509 81.7647 11.8925C81.509 11.2341 81.1524 10.6547 80.6921 10.1571C80.2318 9.65947 79.6803 9.26719 79.039 8.98165C78.3963 8.6961 77.6955 8.55333 76.9366 8.55333C76.1778 8.55333 75.4798 8.6961 74.8454 8.98165C74.2095 9.26719 73.6663 9.65115 73.2143 10.1349C72.7624 10.6187 72.4071 11.1884 72.1528 11.8482C71.8971 12.5066 71.7699 13.2094 71.7699 13.9565V14.0009C71.7699 14.7466 71.8971 15.4494 72.1528 16.1092C72.4085 16.7676 72.7665 17.347 73.2254 17.8446C73.6857 18.3422 74.2358 18.7345 74.8785 19.0187C75.5213 19.3042 76.2206 19.447 76.9809 19.447Z" fill="white" />
                      <path d="M93.6463 21.9273C92.6539 21.9273 91.7554 21.7846 90.9524 21.499C90.1493 21.2135 89.4637 20.7852 88.8943 20.2141C88.3248 19.643 87.8866 18.9374 87.5798 18.0947C87.2729 17.2533 87.1195 16.2761 87.1195 15.163V6.86696C87.1195 6.56062 87.3669 6.3125 87.6724 6.3125H89.2606C89.566 6.3125 89.8134 6.56062 89.8134 6.86696V15.0535C89.8134 16.4881 90.1562 17.5763 90.8432 18.3137C91.5288 19.0539 92.4783 19.4226 93.6905 19.4226C94.9027 19.4226 95.8288 19.0677 96.5158 18.358C97.2027 17.6483 97.5455 16.5838 97.5455 15.163V6.86696C97.5455 6.56062 97.7929 6.3125 98.0984 6.3125H99.6866C99.992 6.3125 100.239 6.56062 100.239 6.86696V15.0313C100.239 16.1735 100.082 17.1771 99.7681 18.0392C99.4544 18.9042 99.012 19.6236 98.444 20.203C97.8745 20.781 97.1848 21.2135 96.3748 21.499C95.5648 21.7846 94.6553 21.9273 93.6491 21.9273H93.6463Z" fill="white" />
                      <path d="M103.062 6.86891C103.062 6.56257 103.309 6.31445 103.615 6.31445H109.106C109.996 6.31445 110.804 6.43505 111.527 6.67624C112.249 6.91743 112.862 7.26535 113.366 7.72C113.871 8.17465 114.256 8.71525 114.527 9.34455C114.797 9.97386 114.932 10.6766 114.932 11.4529V11.4958C114.932 12.3608 114.772 13.1176 114.45 13.7691C114.129 14.4206 113.691 14.9667 113.137 15.4048C112.581 15.8442 111.933 16.1768 111.188 16.4042C110.444 16.6315 109.648 16.7438 108.801 16.7438H105.757V21.1309C105.757 21.4372 105.51 21.6853 105.204 21.6853H103.616C103.311 21.6853 103.063 21.4372 103.063 21.1309V6.86614L103.062 6.86891ZM108.887 14.2861C109.908 14.2861 110.715 14.0311 111.307 13.521C111.898 13.0109 112.194 12.3539 112.194 11.5527V11.5097C112.194 10.6059 111.894 9.92396 111.296 9.46376C110.697 9.00495 109.894 8.77485 108.887 8.77485H106.307C106.002 8.77485 105.754 9.02297 105.754 9.3293V13.7331C105.754 14.0394 106.002 14.2875 106.307 14.2875H108.887V14.2861Z" fill="white" />
                      <path d="M7.69202 7.07129C7.69202 6.65267 8.02927 6.31445 8.4467 6.31445H14.5685C16.335 6.31445 17.6716 6.76911 18.5769 7.67564C19.2625 8.36455 19.6067 9.21287 19.6067 10.2234V10.2677C19.6067 10.7362 19.5445 11.1507 19.4201 11.5083C19.2957 11.8673 19.1353 12.182 18.9377 12.4523C18.7414 12.7226 18.5064 12.961 18.2369 13.1661C17.9674 13.3713 17.6923 13.5473 17.4159 13.6929C17.8679 13.8551 18.2811 14.0408 18.653 14.2529C19.0248 14.465 19.3468 14.7186 19.6164 15.0111C19.8859 15.3036 20.0946 15.6487 20.2411 16.0438C20.3862 16.4388 20.4595 16.9004 20.4595 17.4271V17.4715C20.4595 18.1604 20.324 18.7675 20.0545 19.2943C19.785 19.821 19.4007 20.2604 18.9045 20.6125C18.4083 20.9646 17.8098 21.2307 17.109 21.4137C16.4082 21.5966 15.6342 21.6881 14.7883 21.6881H8.44808C8.03065 21.6881 7.69339 21.3499 7.69339 20.9313V7.07129H7.69202ZM16.9114 10.6628C16.9114 10.0487 16.6805 9.56911 16.2216 9.22396C15.7614 8.8802 15.0938 8.70832 14.2174 8.70832H11.095C10.6776 8.70832 10.3403 9.04653 10.3403 9.46515V12.0364C10.3403 12.4551 10.6776 12.7933 11.095 12.7933H14.0198C14.8961 12.7933 15.5969 12.6214 16.1221 12.2776C16.6474 11.9339 16.91 11.4099 16.91 10.7071V10.6628H16.9114ZM17.7656 17.1416C17.7656 16.4832 17.5057 15.9745 16.9874 15.6154C16.4691 15.2564 15.6771 15.0776 14.6114 15.0776H11.095C10.6776 15.0776 10.3403 15.4158 10.3403 15.8345V18.5374C10.3403 18.956 10.6776 19.2943 11.095 19.2943H14.8076C15.7268 19.2943 16.4497 19.1182 16.9749 18.7675C17.5002 18.4154 17.7642 17.8887 17.7642 17.1859V17.1416H17.7656Z" fill="black" />
                      <path d="M22.5605 6.31445H23.745C24.1625 6.31445 24.4997 6.65267 24.4997 7.07129V20.9313C24.4997 21.3499 24.1625 21.6881 23.745 21.6881H22.5605C22.143 21.6881 21.8058 21.3499 21.8058 20.9313V7.07129C21.8058 6.65267 22.143 6.31445 22.5605 6.31445Z" fill="black" />
                    </g>
                    <defs>
                      <clipPath id="clip0_bi_wordmark">
                        <rect width="115" height="28" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <ArrowUpRight className="relative -top-[1px] h-[0.42em] w-[0.42em] shrink-0 text-white/85" />
                </Link>
              </p>
            </div>
          </FadeIn>
        </section>

        <section
          id="about"
          className="mt-10 grid scroll-mt-24 gap-10 pt-8 sm:mt-12 sm:pt-10 lg:mt-14 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <FadeIn>
            <div>
              <div className="space-y-8">
                {experience.map((item) => (
                  <div key={`${item.years}-${item.title}`}>
                  <p className="text-sm text-white/55">{item.years}</p>
                    {item.href ? (
                      <Link
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-1 inline-flex items-center gap-1.5 text-base leading-6 tracking-tight text-white sm:text-lg"
                      >
                        <span>{item.title}</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-white/70 transition group-hover:text-white" />
                      </Link>
                    ) : (
                      <p className="mt-1 text-base leading-6 tracking-tight sm:text-lg">
                        {item.title}
                      </p>
                    )}
                    <p className="mt-1 max-w-xl text-sm leading-6 text-white/55">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="max-w-2xl">
              <div>
                <p className="text-sm text-white/55">About</p>
                <p className="mt-3 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                  I provide forward-thinking product design solutions from discovery to production.
                  I work on UX and UI strategy, interaction design, and system thinking with a
                  strong focus on measurable outcomes. My work contributed to{" "}
                  <span className="text-white">+$4M in MRR</span> and{" "}
                  <span className="text-white">+37% pageview growth</span>.
                </p>
              </div>

              <div className="mt-10">
                <p className="text-sm text-white/55">Principles</p>
                <ul className="mt-3 space-y-2 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                  {principles.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <p className="text-sm text-white/55">Contact</p>
                <div className="mt-3 space-y-2 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                  <p>
                    <Link
                      href="mailto:izimbetov.myrzan@gmail.com"
                      className="inline-flex items-center gap-2 hover:text-white"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-white/65" />
                      <span>izimbetov.myrzan@gmail.com</span>
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="https://www.linkedin.com/in/myrzanio/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-white"
                    >
                      <Linkedin className="h-4 w-4 shrink-0 text-white/65" />
                      <span>linkedin.com/in/myrzanio</span>
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="https://t.me/myrzanio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-white"
                    >
                      <Send className="h-4 w-4 shrink-0 text-white/65" />
                      <span>t.me/myrzanio</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <section id="projects" className="mt-12 scroll-mt-24 pt-8 sm:mt-16 sm:pt-10 md:mt-20">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm text-white/55">Selected Work</p>
              </div>
            </div>
          </FadeIn>

          {notionProjects.length > 0 && (
            <Stagger className="mt-8 divide-y divide-white/10">
              {notionProjects.map((block: any, index: number) => (
                <StaggerItem key={block.id}>
                  <article className="grid gap-5 py-5 md:grid-cols-[10rem_minmax(0,1fr)_14rem] md:items-center">
                    <div className="text-sm text-white/55">
                      <p>{String(index + 1).padStart(2, "0")}</p>
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={`/selected-work/${block.pageMeta?.pageId ?? block.id}`}
                        className="group inline-flex items-center gap-2 text-xl leading-tight tracking-tight sm:text-2xl"
                      >
                        <span>{block.pageMeta?.title || block.child_page?.title}</span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-white/70 transition group-hover:text-white" />
                      </Link>
                      {block.pageMeta?.blocks && block.pageMeta.blocks.length > 0 && (
                        <div className="mt-2 space-y-3 text-sm text-white/65">
                          <NotionContent blocks={block.pageMeta.blocks.slice(0, 2)} />
                        </div>
                      )}
                    </div>

                    {block.pageMeta?.cover ? (
                      <Link
                        href={`/selected-work/${block.pageMeta?.pageId ?? block.id}`}
                        className="block overflow-hidden rounded-2xl border border-white/10"
                        aria-hidden
                        tabIndex={-1}
                      >
                        <div
                          className="h-28 bg-cover bg-center opacity-90 transition duration-500 hover:scale-[1.03] hover:opacity-100 md:h-24"
                          style={{ backgroundImage: `url(${block.pageMeta.cover})` }}
                        />
                      </Link>
                    ) : (
                      <div />
                    )}
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </section>

        <section id="contact" className="mt-12 scroll-mt-24 pt-8 sm:mt-16 sm:pt-10 md:mt-20">
          <FadeIn>
            <div className="max-w-3xl">
              <p className="text-sm text-white/55">Contact</p>
              <p className="mt-3 text-[1.55rem] font-medium leading-[2rem] tracking-tight text-white sm:text-[2.35rem] sm:leading-[3rem] md:text-[3rem] md:leading-[4rem]">
                Say hi
                <br />
                <Link
                  href="mailto:izimbetov.myrzan@gmail.com"
                  className="inline-flex max-w-full items-center gap-2 break-all text-white transition hover:text-white/80 sm:break-normal"
                >
                  <span>izimbetov.myrzan@gmail.com</span>
                  <ArrowUpRight className="h-[0.7em] w-[0.7em] shrink-0" />
                </Link>
              </p>
            </div>
          </FadeIn>
        </section>

        <footer className="mt-10 pb-24 pt-6 text-sm text-white/45 md:mt-12 md:pb-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>© {new Date().getFullYear()} Myrzan Izimbetov</span>
            <Link href="#main" className="hover:text-white/80">
              Back to top
            </Link>
          </div>
        </footer>
      </main>
    </div>
  )
}
