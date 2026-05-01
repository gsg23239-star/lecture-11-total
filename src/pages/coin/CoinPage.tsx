import CoinList from "./CoinList";
import styled from "styled-components";
import { useEffect, useState } from "react";
import CoinDetail from "./CoinDetail.tsx";

export interface Coin {
    id: string;
    symbol: string;
    name: string;
    nameid: string;
    rank: number;
    price_usd: string;
    percent_change_24h: string;
    market_cap_usd: string;
    volume24: string;
}
const PageContainer = styled.div`
    display: flex;
    gap: 20px;
    height: calc(100vh - 150px);
`;

function CoinPage() {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch("https://api.coinlore.net/api/tickers/?start=0&limit=50");
                const json = await response.json();
                setCoins(json.data);
                setLoading(false);
            } catch (error) {
                console.error("코인 테이터를 불러오는데 실패했습니다.", error);
                setLoading(false);
            }
        };

        fetchCoins().then(() =>{});
    },[]);

    return (
        <PageContainer>
            <CoinList
                coins={coins}
                loading={loading}
                selectedCoin={selectedCoin}
                onSelectCoin={setSelectedCoin}
            />
            <CoinDetail selectedCoin={selectedCoin} />
        </PageContainer>
    );
}

export default CoinPage;