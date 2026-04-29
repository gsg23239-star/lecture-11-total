import type { ReactNode } from "react";
import styled from "styled-components";
import { Link } from "react-router";
import {
    FaCheckSquare,
    FaBitcoin,
    FaFilm,
    FaSpaceShuttle,
    FaBook,
    FaClipboardList,
} from "react-icons/fa";

type ProjectItem = {
    title: string;
    desc: string;
    path: string;
    icon: ReactNode;
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const WelcomeSection = styled.section`
    padding: 40px;
    background-color: ${props => props.theme.colors.background.paper};
    border-radius: 20px;
    border: 1px solid ${props => props.theme.colors.divider};
`;

const Title = styled.h2`
    font-size: 32px;
    font-weight: 800;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 10px;
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap; /* 한 줄이 가득 차면 다음 줄로 넘김 */
    gap: 20px; /* 카드 사이의 간격 */
`;

const ProjectCard = styled(Link)`
    /* 한 줄에 3개씩 출력하기 위한 핵심 설정 */
    width: calc((100% - 40px) / 3);
    min-width: 280px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
    padding: 30px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center; /* 아이콘과 텍스트 중앙 정렬 */
    text-align: center;
    gap: 15px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
    }
`;

const IconBox = styled.div`
    font-size: 40px;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 10px;
`;

const ProjectTitle = styled.h3`
    font-size: 20px;
    font-weight: 700;
    color: ${props => props.theme.colors.text.default};
`;

const ProjectDesc = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: ${props => props.theme.colors.text.disabled};
`;

// --- Component ---

function Home() {
    const projectList: ProjectItem[] = [
        {
            title: "투두리스트",
            desc: "일 체계적인 일정 관리와 할 일 목록 기록",
            path: "/todo",
            icon: <FaCheckSquare />,
        },
        {
            title: "코인트래커",
            desc: "실시간 가상화폐 시세 확인 및 정보 트래킹",
            path: "/coin",
            icon: <FaBitcoin />,
        },
        {
            title: "무비검색앱",
            desc: "영화 데이터베이스 API를 활용한 영화 검색",
            path: "/movie",
            icon: <FaFilm />,
        },
        {
            title: "게시판",
            desc: "기본적인 커뮤니티 게시판",
            path: "/board",
            icon: <FaClipboardList />,
        },
        {
            title: "로켓앱",
            desc: "스페이스X의 로켓 발사 상태 및 상세 정보 조회",
            path: "/rocket",
            icon: <FaSpaceShuttle />,
        },
        {
            title: "구글북스 검색앱",
            desc: "구글 도서 데이터를 활용한 온라인 책 검색",
            path: "/book",
            icon: <FaBook />,
        },
    ];

    return (
        <Container>
            <WelcomeSection>
                <Title>My Project Dashboard</Title>
                <ProjectDesc>지금까지 구축한 포트폴리오 리스트입니다.</ProjectDesc>
            </WelcomeSection>

            <CardContainer>
                {projectList.map(project => (
                    <ProjectCard key={project.path} to={project.path}>
                        <IconBox>{project.icon}</IconBox>
                        <ProjectTitle>{project.title}</ProjectTitle>
                        <ProjectDesc>{project.desc}</ProjectDesc>
                    </ProjectCard>
                ))}
            </CardContainer>
        </Container>
    );
}

export default Home;
