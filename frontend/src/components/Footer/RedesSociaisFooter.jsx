import React from "react";
import facebookIcon from "@/assets/social/facebook.svg";
import twitterIcon from "@/assets/social/twitter.svg";
import instagramIcon from "@/assets/social/instagram.svg";
import youtubeIcon from "@/assets/social/youtube.svg";

export default function RedesSociaisFooter() {
  return (
    <div className="p-2 flex flex-col items-start gap-4 relative top-8">
      <div className="flex items-center gap-4">
        <p className="text-[23px] w-56">Siga a Prefeitura de SP nas redes sociais: </p>
        <div>
          <button>
            <a href="">
              <img src={facebookIcon} alt="Facebook" />
            </a>
          </button>
          <button>
            <a href="">
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </button>
          <button>
            <a href="">
              <img src={instagramIcon} alt="Instagram" />
            </a>
          </button>
          <button>
            <a href="">
              <img src={youtubeIcon} alt="Youtube" />
            </a>
          </button>
        </div>
      </div>
      <div>
        <p className="text-[var(--color-orange)] text-xl font-bold">
          Prefeitura de SP: Aqui o trabalho não para
        </p>
      </div>
    </div>
  );
}
