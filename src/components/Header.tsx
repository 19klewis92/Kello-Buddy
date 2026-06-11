import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";

const Header = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        // OAuth 리다이렉트 시 발생한 에러가 URL에 포함되어 있는지 확인합니다.
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);
        const errorDesc = hashParams.get('error_description') || queryParams.get('error_description');

        if (errorDesc) {
            alert('인증 오류 발생: ' + decodeURIComponent(errorDesc).replace(/\+/g, ' '));
            // 에러 확인 후 URL 깔끔하게 정리
            window.history.replaceState(null, '', window.location.pathname);
        }

        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
                console.error("Session fetch error:", error);
            }
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const scrollToSection = (id: string) => {
        setIsMobileMenuOpen(false); // 모바일 메뉴 닫기
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
            <div className="container mx-auto px-6 h-14 md:h-16 flex items-center justify-between">
                <div className="flex items-center">
                </div>
                
                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6">
                    <button onClick={() => scrollToSection('service')} className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">서비스소개</button>
                    <button onClick={() => scrollToSection('benefits')} className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">파트너 혜택</button>
                    <button onClick={() => scrollToSection('faq')} className="text-sm font-semibold text-foreground/80 hover:text-primary transition-colors">FAQ</button>
                    <button 
                        onClick={() => scrollToSection('apply')} 
                        className="text-sm font-bold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors shadow-sm"
                    >
                        파트너 신청하기
                    </button>
                </nav>

                {/* Mobile Menu Toggle Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-foreground p-2 -mr-2">
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav Dropdown - Miniaturized Version (50% scale feel) */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/10 backdrop-blur-[1px]">
                    <div 
                        className="w-[60%] max-w-[240px] bg-background rounded-xl shadow-2xl p-4 flex flex-col gap-2 animate-in fade-in zoom-in-90 duration-200 border border-border/50 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-end mb-1 border-b border-border/30 pb-2">
                            <button onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-muted p-1 rounded-md transition-colors">
                                <X className="w-4 h-4 text-foreground/70" />
                            </button>
                        </div>

                        {/* Mini Menu Items */}
                        <div className="flex flex-col">
                            <button onClick={() => scrollToSection('service')} className="text-left text-[13px] font-bold text-foreground/80 hover:text-primary py-2 px-1 hover:bg-muted/30 transition-colors border-b border-border/10">서비스소개</button>
                            <button onClick={() => scrollToSection('benefits')} className="text-left text-[13px] font-bold text-foreground/80 hover:text-primary py-2 px-1 hover:bg-muted/30 transition-colors border-b border-border/10">파트너 혜택</button>
                            <button onClick={() => scrollToSection('faq')} className="text-left text-[13px] font-bold text-foreground/80 hover:text-primary py-2 px-1 hover:bg-muted/30 transition-colors border-b border-border/10">FAQ</button>
                        </div>

                        {/* Compact Button */}
                        <button 
                            onClick={() => scrollToSection('apply')} 
                            className="text-center text-[13px] font-bold bg-primary text-primary-foreground px-3 py-2.5 rounded-lg hover:bg-primary/90 transition-all shadow-sm active:scale-95 mt-1"
                        >
                            파트너 신청하기
                        </button>
                    </div>
                    {/* Background overlay to close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setIsMobileMenuOpen(false)} />
                </div>
            )}
        </header>
    );
};

export default Header;
