import type { Coin } from "./CoinPage";
import styled from "styled-components";
import { FaInfoCircle } from "react-icons/fa";

interface CoinDetailProps {
    selectedCoin: Coin | null;
}

const DetailSection = styled.main`
    flex: 2;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
    border-radius: 16px;
    padding: 40px;
    display: flex;
    flex-direction: column;
`;

const EmptyDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.colors.text.disabled};
    gap: 15px;

    svg {
        font-size: 48px;
        color: ${props => props.theme.colors.warning};
        opacity: 0.5;
    }
`;

const DetailHeader = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 15px;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.divider};

    h2 {
        font-size: 32px;
        color: ${props => props.theme.colors.primary};
    }
    span {
        font-size: 20px;
        color: ${props => props.theme.colors.text.disabled};
        margin-bottom: 4px;
    }
`;

const InfoGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const InfoCard = styled.div`
    flex: 1;
    min-width: 200px;
    background-color: ${props => props.theme.colors.background.default};
    padding: 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    span {
        font-size: 14px;
        color: ${props => props.theme.colors.text.disabled};
    }
    strong {
        font-size: 24px;
        color: ${props => props.theme.colors.text.default};
    }
`;

function CoinDetail({ selectedCoin }:CoinDetailProps) {
    if (!selectedCoin) {
        return (
            <DetailSection>
                <EmptyDetail>
                    <FaInfoCircle />
                    <p>좌측 목록에서 코인을 선택해주세요.</p>
                </EmptyDetail>
            </DetailSection>
        );
    }

    return (
        <DetailSection>
            <DetailHeader>
                <h2>{selectedCoin.name}</h2>
                <span>{selectedCoin.symbol}</span>
            </DetailHeader>

            <InfoGrid>
                <InfoCard>
                    <span>현재 가격 (USD)</span>
                    <strong>${parseFloat(selectedCoin.price_usd).toLocaleString()}</strong>
                </InfoCard>
                <InfoCard>
                    <span>시가총액</span>
                    <strong>${parseInt(selectedCoin.market_cap_usd).toLocaleString()}</strong>
                </InfoCard>
                <InfoCard>
                    <span>24시간 거래량</span>
                    <strong>${parseInt(selectedCoin.volume24).toLocaleString()}</strong>
                </InfoCard>
                <InfoCard>
                    <span>시가총액 순위</span>
                    <strong>{selectedCoin.rank}위</strong>
                </InfoCard>
            </InfoGrid>
        </DetailSection>
    );
}

export default CoinDetail;
