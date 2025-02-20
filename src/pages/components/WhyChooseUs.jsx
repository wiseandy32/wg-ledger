import Slide from "./Slide";
// import creditCardMockup from "../../assets/credit-card-mockup.webp";
import { chooseUsCardInfo } from "@/data";

function WhyChooseUs() {
  return (
    // removed pt-20
    <section
      // style={{ border: "2px solid yellow" }}
      className="mt-[5rem] mb-20 sm:mt-32 sm:mb-32 md:mt-30 md:mb-40 sm:px-10"
    >
      {/* removed flex flex-col-reverse sm:flex-row justify-between */}
      <div className="flex flex-col-reverse sm:flex-row justify-between sm:mt-0  gap-16 sm:gap-0">
        <div className="flex flex-col gap-y-4 sm:gap-y-10 px-5">
          <Slide yAxis={90}>
            <p className="text-sm mb-2 text-[#1c8d0c] font-bold capitalize">
              World Global Ledger
            </p>
            <h2 className="md:mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-50 capitalize">
              Start Your Secure Journey Today:
            </h2>
            <p className="mt-4 max-w-3xl space-y-6 text-slate-50 ">
              Choose QFS Ledger for cutting-edge security, seamless assets
              management, and peace of mind. Our commitment to stability and
              protection ensures your digital assets are safe and accessible
              whenever you need them
            </p>
          </Slide>
          {/* removed flex flex-wrap flex-col justify-between */}
          <div className="grid grid-cols-[300px,300px,300px,300px,300px,300px] max-sm:overflow-x-scroll md:grid-cols-3 gap-5 mt-20 backdrop-blur-md">
            {chooseUsCardInfo.map((item, index) => (
              <Slide
                key={item.title}
                yAxis={90}
                delay={index === 0 ? 0.2 : 0.2 * index}
                className={`grid grid-cols-subgrid md:col-start-[${
                  index + 1
                }] md:col-end-[${
                  index + 3
                }] bg-[#0e1a40] highlight-white/5 rounded-lg p-6 text-[#e3f9e5] hover:bg-[#162a6d] hover:shadow-[0_35px_60px_-15px_rgba(0,0,32,0.8)] flex flex-col`}
              >
                {/* <i className="lni lni-thunder"></i> */}
                <img
                  src={item.image}
                  alt=""
                  width={252}
                  height={178}
                  className="rounded-lg w-full h-full object-center"
                />
                <h5 className="text-white font-semibold text-2xl capitalize mt-2">
                  {item.title}
                </h5>
                <p className="mt-6 text-slate-50">{item.subtext}</p>
                {/* <div className="p-[15px_13px_15px_17px] bg-[linear-gradient(60deg,#ceff0c_0%,#e1ff63_100%)] rounded-[50px] w-5 h-5"></div> */}
              </Slide>
            ))}
          </div>
        </div>
        {/* <Slide xAxis={100} className={"sm:w-[40%] h-[304px] sm:h-[670px]"}>
          <img src={creditCardMockup} className="w-full h-full" alt="" />
        </Slide> */}
      </div>
    </section>
  );
}

export default WhyChooseUs;
