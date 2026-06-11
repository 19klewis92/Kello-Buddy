import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const FloatingPromo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // 2초 뒤에 등장
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenPromo = () => {
    window.dispatchEvent(new Event('open-promo-popup'));
  };

  return (
    <>
      <div className="fixed bottom-20 sm:bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center pointer-events-none w-max max-w-[95vw]">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.9 }}
              className="pointer-events-auto flex flex-col items-center"
            >
              {isMinimized ? (
                /* Minimized Icon State */
                <motion.button
                  layoutId="promo-card"
                  onClick={() => setIsMinimized(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 bg-[#fef08a] text-amber-950 rounded-full shadow-kello-glow border-2 border-[#fde047] flex items-center justify-center relative overflow-hidden group"
                >
                  <img 
                    src="/event-coffee.png" 
                    alt="이벤트 아이콘" 
                    className="w-10 h-10 object-contain" 
                  />
                  <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-0 right-0 w-3 h-3 bg-[#fde047] rounded-full border-2 border-white animate-bounce" />
                </motion.button>
              ) : (
                /* Expanded Card State */
                <motion.div 
                  layoutId="promo-card"
                  className="flex items-center"
                >
                  <div className="bg-[#fef08a] rounded-full shadow-kello-glow border border-[#fde047] mx-auto overflow-hidden flex items-center justify-between group pointer-events-auto w-[85vw] max-w-[360px] sm:max-w-[450px]">
                    {/* Main Content (Click to open promo) */}
                    <button
                      onClick={handleOpenPromo}
                      className="py-3 px-4 sm:px-6 flex-1 flex items-center justify-center gap-3 text-left transition-all hover:bg-amber-100/50 relative"
                    >
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-[#fde047]">
                          <img 
                            src="/event-coffee.png" 
                            alt="커피 이벤트" 
                            className="w-7 h-7 object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[15px] sm:text-lg font-black text-amber-950 leading-tight break-keep whitespace-nowrap">
                          설문 완료하고 커피 쿠폰 받기 🎁
                        </h4>
                      </div>
                    </button>

                    {/* Close Button integrated */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMinimized(true);
                      }}
                      className="mr-3 p-1.5 shrink-0 text-amber-900/40 hover:text-amber-900 hover:bg-amber-300/50 rounded-full transition-colors"
                      title="축소하기"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingPromo;
