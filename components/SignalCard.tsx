'use client';

import React, { useState, useEffect } from 'react';
import { TradingSignal } from '@/lib/signals';

export default function SignalCard({ signal }: { signal: TradingSignal }) {
  const signalColor =
    signal.signal === 'BUY'
      ? 'border-neon-green bg-green-900 bg-opacity-20'
      : signal.signal === 'SELL'
        ? 'border-neon-red bg-red-900 bg-opacity-20'
        : 'border-neon-yellow bg-yellow-900 bg-opacity-20';

  const signalTextColor =
    signal.signal === 'BUY'
      ? 'text-neon-green'
      : signal.signal === 'SELL'
        ? 'text-neon-red'
        : 'text-neon-yellow';

  return (
    <div className={`border-2 ${signalColor} rounded-lg p-4 font-mono text-sm`}>
      <div className="flex justify-between items-center mb-3">
        <span className="text-white font-bold">{signal.pair}</span>
        <span className={`${signalTextColor} font-bold text-lg`}>{signal.signal}</span>
      </div>

      <div className="space-y-2 text-gray-300">
        <div>
          <span className="text-neon-blue">Confidence:</span> {signal.confidence.toFixed(0)}%
        </div>
        <div>
          <span className="text-neon-blue">Entry:</span> {signal.entry.toFixed(4)}
        </div>
        <div>
          <span className="text-neon-blue">Stop Loss:</span> {signal.stop_loss.toFixed(4)}
        </div>
        <div>
          <span className="text-neon-blue">Take Profit:</span> {signal.take_profit.toFixed(4)}
        </div>
        <div className="pt-2 border-t border-gray-700">
          <span className="text-neon-blue">Reason:</span>
          <p className="text-xs text-gray-400 mt-1">{signal.reason}</p>
        </div>
      </div>
    </div>
  );
}