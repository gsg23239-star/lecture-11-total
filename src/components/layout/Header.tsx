import { useContext } from "react";
import { Link, useLocation } from "react-router";
import styled, { useTheme } from "styled-components";
import {
    FaHome,
    FaCheckSquare,
    FaBitcoin,
    FaFilm,
    FaSpaceShuttle,
    FaBook,
    FaSun,
    FaMoon,
 } from "react-icons/fa";
    import { ThemeContext } from "../../contexts/theme/ThemeContext";

const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;   /* 헤더의 고정높이 */
    background-color: ${props => props.theme.colors.background.paper};
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    display: flex;
    align-items: center;
    justify-content: space-between; /* 로고, 메뉴, 버튼을 양끝/중앙으로 분산 */
    padding: 0 40px;
    flex-shrink: 0;
    transition:
        background-color 0.3s ease,
        border-color 0.3s ease;
`;

const Logo = styled.h1`
    font-size: 24px;
    font-weight: 800;
    color: ${props => props.theme.colors.text.default};
    display: flex;
    align-items: center;
    gap: 10px;
`;

const NavMenu = styled.nav`
    display: flex;
    gap: 8px;   /* 메뉴간의 가로간격 */
`;

const NavItem = styled(Link)<{ $isActive: boolean }>`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.2s ease;
    background-color: ${props =>
        props.$isActive ? props.theme.colors.background.default : "transparent"};
    color: ${props =>
        props.$isActive ? props.theme.colors.primary : props.theme.colors.text.disabled};
    
    &:hover {
        background-color: ${props => props.theme.colors.background.default};
    }
`;

const ThemeToggleButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90px;
    height: 36px;
    gap: 8px;
    background-color: ${props => props.theme.colors.background.default};
    color: ${props => props.theme.colors.text.default};
    border: 1px solid ${props => props.theme.colors.divider};
    border-radius: 20px; /* 상단 바에 어울리는 알약 형태 */
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
    }
`;

// --- Component ---

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const currentThemeStyle= useTheme();
    const isDark = theme === "dark";

    const { pathname } = useLocation();

    return (
        <HeaderContainer>

            <Logo>
                <FaSpaceShuttle color={currentThemeStyle.colors.primary} /> My project
            </Logo>

            <NavMenu>
                <NavItem to="/" $isActive={pathname === "/"}>
                    <FaHome size={18} /> Home
                </NavItem>
                <NavItem to="/todo" $isActive={pathname.startsWith("/todo")}>
                    <FaCheckSquare size={18} /> Todo
                </NavItem>
                <NavItem to="/coin" $isActive={pathname.startsWith("/coin")}>
                    <FaBitcoin size={18} /> Coin
                </NavItem>
                <NavItem to="/movie" $isActive={pathname.startsWith("/movie")}>
                    <FaFilm size={18} /> Movie
                </NavItem>
                <NavItem to="/rocket" $isActive={pathname.startsWith("/rocket")}>
                    <FaSpaceShuttle size={18} /> Rocket
                </NavItem>
                <NavItem to="/book" $isActive={pathname.startsWith("/book")}>
                    <FaBook size={18} /> Book
                </NavItem>
            </NavMenu>

            <ThemeToggleButton onClick={toggleTheme}>
                {isDark ? (
                    <>
                        <FaSun size={16} color={currentThemeStyle.colors.secondary} /> 라이트
                    </>
                ) : (
                    <>
                        <FaMoon size={16} color={currentThemeStyle.colors.secondary} /> 다크
                    </>
                )}
            </ThemeToggleButton>
        </HeaderContainer>
    );
}

export default Header;