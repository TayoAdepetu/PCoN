import PrimaryButton from "../../../Common/Buttons/PrimaryButton";
import SecondaryButton from "../../../Common/Buttons/SecondaryButton";
import { IoIosArrowForward } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 px-4">
      <div className="max-w-screen-xl mx-auto flex flex-wrap gap-5 [&>*]:flex-[1_0_230px] text-gray-400">
        <div className="flex flex-col gap-4">
          <img src="/logo.svg" alt="Advanced DND" width={150} height={64} />
          <p className="text-sm">© RMKS. All rights reserved</p>
          <div className="flex flex-col gap-4 max-w-[200px]">
            <PrimaryButton style="py-2 flex items-center justify-between gap-2">
              Request a Demo <IoIosArrowForward />
            </PrimaryButton>
            <SecondaryButton style="py-2 flex items-center justify-between gap-2">
              Contact Sales <MdArrowOutward />
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
              <a href="#">Use Cases</a>
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
    </footer>
  );
}
