import PrimaryButton from "../Common/Buttons/PrimaryButton";
import SecondaryButton from "../Common/Buttons/SecondaryButton";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-wrap gap-5 [&>*]:flex-[1_0_230px] text-gray-400">
        <div className="flex flex-col gap-4">
          <img
            src="/logo.svg"
            alt="Sample Logo"
            width={40}
            height={64}
          />
          <p className="text-sm">© FeedAfrica 2024. All rights reserved</p>
          <div className="flex flex-col gap-4 max-w-[200px]">
            <PrimaryButton style="py-2 flex items-center justify-between gap-2">
              Request a Demo <IoIosArrowForward />
            </PrimaryButton>
            <SecondaryButton style="py-2 flex items-center justify-between gap-2">
              Our Products <MdArrowOutward />
            </SecondaryButton>
          </div>
        </div>
        <div>
          <h6 className="text-primary font-semibold mb-3">Quick Links</h6>
          <ul className="space-y-2">
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Mission</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Testimonials</a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-primary font-semibold mb-3">Socials</h6>
          <ul className="space-y-2">
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Tiktok</a>
            </li>
            <li>
              <a href="#">LinkedIn</a>
            </li>
            <li>
              <a href="#">Youtube</a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-primary font-semibold mb-3">Legal</h6>
          <ul className="space-y-2">
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Order Cancellation Policy</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">KYC/AML Policy</a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className="text-primary font-semibold mb-3">Resources</h6>
          <ul className="space-y-2">
            <li>
              <a href="#">Impact</a>
            </li>
            <li>
              <a href="#">Call to Action</a>
            </li>
            <li>
              <a href="#">Newsletter</a>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="container mx-auto mt-8 py-8 border-t border-t-gray-300 text-sm text-gray-400">
        <p>
          We are an all-inclusive SaaS and hardware company committed to
          revolutionizing agriculture in Africa. By providing farmers and
          agribusinesses with advanced tools, data intelligence, access to
          credit, and sustainable farming education, we bridge the gap between
          technology and agriculture to build a food-secure continent. To be one
          of the driving forces behind Africa&apos;s agricultural
          transformation, enabling precise and sustainable farming and
          empowering farmers of all sizes to feed the continent with innovation
          and resilience.
        </p>
      </div> */}
    </footer>
  );
}
