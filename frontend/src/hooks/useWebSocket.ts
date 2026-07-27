import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import type { IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface SaaSMetricsResponse {
    totalHeadcount: number;
    activeCount: number;
    onLeaveCount: number;
    terminatedCount: number;
    totalMonthlyPayroll: number;
    departmentSalaryDistribution: Record<string, number>;
}

export const useWebSocket = (tenantId: string) => {
    const [metrics, setMetrics] = useState<SaaSMetricsResponse | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);

    useEffect(() => {
        if (!tenantId) return;

        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            reconnectDelay: 5000,
            onConnect: () => {
                setIsConnected(true);
                client.subscribe(`/topic/tenant/${tenantId}/employee-events`, (message: IMessage) => {
                    if (message.body) {
                        setMetrics(JSON.parse(message.body));
                    }
                });
            },
            onDisconnect: () => {
                setIsConnected(false);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [tenantId]);

    return { metrics, isConnected };
};
