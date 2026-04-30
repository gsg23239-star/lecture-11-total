import styled from "styled-components";
import { FaBitcoin, FaArrowUp, FaArrowDown } from "react-icons/fa";
import type { Coin } from "./CoinPage";

interface CoinListProps {
    coins: Coin[];
    loading: boolean;
    selectedCoin: Coin | null;
    onSelectCoin: (coin: Coin) => void;
}

const ListSection = styled.aside`
    flex: 1;
    min-width: 300px;
    max-width: 400px;
    background-color: ${props => props.theme.colors.background.paper};
    border: 1px solid ${props => props.theme.colors.divider};
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

const ListHeader = styled.div`
    padding: 20px;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    font-size: 18px;
    font-weight: 800;
    color: ${props => props.theme.colors.text.default};
    display: flex;
    align-items: center;
    gap: 10px;
`;

const CoinUl = styled.ul`
    list-style: none;
    overflow-y: auto;
    flex: 1;

    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.divider};
        border-radius: 3px;
    }
`;

const CoinLi = styled.li<{ $isSelected: boolean }>`
    padding: 15px 20px;
    border-bottom: 1px solid ${props => props.theme.colors.divider};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.2s ease;

    background-color: ${props =>
        props.$isSelected ? props.theme.colors.background.default : "transparent"};

    border-left: 4px solid
        ${props => (props.$isSelected ? props.theme.colors.primary : "transparent")};

    &:hover {
        background-color: ${props => props.theme.colors.background.default};
    }
`;

const CoinNameBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
        font-size: 16px;
        color: ${props => props.theme.colors.text.default};
    }
    span {
        font-size: 12px;
        color: ${props => props.theme.colors.text.disabled};
    }
`;

const CoinPriceBox = styled.div<{ $isPositive: boolean }>`
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 4px;

    strong {
        font-size: 14px;
        color: ${props => props.theme.colors.text.default};
    }
    span {
        font-size: 12px;
        font-weight: 600;
        color: ${props =>
            props.$isPositive ? props.theme.colors.success : props.theme.colors.error};
    }
`;

const StatusMessage = styled.div`
    padding: 20px;
    text-align: center;
    color: ${props => props.theme.colors.text.disabled};
`;

function CoinList({ coins, loading, selectedCoin, onSelectCoin }: CoinListProps) {
    return (
        <ListSection>
            <ListHeader>
                <FaBitcoin /> Top 50 Coins
            </ListHeader>

            {loading ? (
                <StatusMessage>데이터를 불러오는 중...</StatusMessage>
            ) : (
                <CoinUl>
                    {coins.map(coin => {
                        const percentChange = parseFloat(coin.percent_change_24h);
                        const isPositive = percentChange > 0;

                        return (
                            <CoinLi
                                key={coin.id}
                                $isSelected={selectedCoin?.id === coin.id}
                                onClick={() => onSelectCoin(coin)}>
                                <CoinNameBox>
                                    <strong>{coin.name}</strong>
                                    <span>{coin.symbol}</span>
                                </CoinNameBox>
                                <CoinPriceBox $isPositive={isPositive}>
                                    <strong>${parseFloat(coin.price_usd).toLocaleString()}</strong>
                                    <span>
                                        {isPositive ? (
                                            <FaArrowUp size={10} />
                                        ) : (
                                            <FaArrowDown size={10} />
                                        )}
                                        {Math.abs(percentChange)}%
                                    </span>
                                </CoinPriceBox>
                            </CoinLi>
                        );
                    })}
                </CoinUl>
            )}
        </ListSection>
    );
}

export default CoinList;
