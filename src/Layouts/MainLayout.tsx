import styled from "styled-components";
import { Outlet } from "react-router";
import Header from "../components/layout/Header.tsx";

const LayoutWrapper= styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
`;

const MainContent = styled.main`
    flex: 1;  /*  사이드바를 제외한 나머지 영역을 모두 차지합니다. */
    display: flex;
    flex-direction: column;
    padding: 40px;
    overflow-y: auto; /* 내용이 넘칠 경우 메인 영역만 스크롤되도록 설정 */
    
    
    /* 커스텀 스크롤바 디자인 (산택사항) */
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.divider};
        border-radius: 4px;
    }
`;

function MainLayout() {
    return (
        <LayoutWrapper>
            <Header />
            <MainContent>
                <Outlet />
            </MainContent>
        </LayoutWrapper>
    );
}

export default MainLayout;