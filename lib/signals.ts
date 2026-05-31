// AI Signal Engine - Core Trading Signal Logic

export interface MarketData {
  pair: string;
  price: number;
  ema50: number;
  ema200: number;
  rsi: number;
  macdLine: number;
  macdSignal: number;
  volatility: number;
  isBreakout: boolean;
  isBreakdown: boolean;
}

export interface TradingSignal {
  pair: string;
  signal: 'BUY' | 'SELL' | 'WAIT';
  confidence: number;
  entry: number;
  stop_loss: number;
  take_profit: number;
  reason: string;
}

const calculateSignalScore = (data: MarketData): number => {
  let score = 50; // Base score

  // EMA Analysis: +20 if bullish, -20 if bearish
  if (data.ema50 > data.ema200) {
    score += 20;
  } else if (data.ema50 < data.ema200) {
    score -= 20;
  }

  // RSI Analysis
  if (data.rsi < 30) {
    score += 15; // Oversold - buying opportunity
  } else if (data.rsi > 70) {
    score -= 15; // Overbought - selling pressure
  }

  // MACD Analysis
  if (data.macdLine > data.macdSignal) {
    score += 15; // Bullish crossover
  } else if (data.macdLine < data.macdSignal) {
    score -= 15; // Bearish crossover
  }

  // Breakout/Breakdown Analysis
  if (data.isBreakout) {
    score += 20;
  } else if (data.isBreakdown) {
    score -= 20;
  }

  // BTC Special Rules
  if (data.pair === 'BTC/USD') {
    if (data.rsi > 60) score += 10;
    if (data.rsi < 40) score += 10;
  }

  // Volatility penalty
  if (data.volatility > 3) {
    score -= 10;
  }

  // Clamp score between 0 and 100
  return Math.max(0, Math.min(100, score));
};

export const generateSignal = (data: MarketData): TradingSignal => {
  const score = calculateSignalScore(data);

  let signal: 'BUY' | 'SELL' | 'WAIT' = 'WAIT';
  if (score >= 70) {
    signal = 'BUY';
  } else if (score <= 30) {
    signal = 'SELL';
  }

  // Calculate price levels
  const spread = data.price * 0.02; // 2% spread
  const stopLoss = signal === 'BUY' ? data.price - spread : data.price + spread;
  const takeProfit = signal === 'BUY' ? data.price + spread * 2 : data.price - spread * 2;

  // Generate reason
  const reasons: string[] = [];
  if (data.ema50 > data.ema200) reasons.push('EMA50 > EMA200');
  if (data.rsi < 30) reasons.push('RSI oversold');
  if (data.macdLine > data.macdSignal) reasons.push('MACD bullish');
  if (data.isBreakout) reasons.push('Breakout detected');

  return {
    pair: data.pair,
    signal,
    confidence: score,
    entry: Math.round(data.price * 10000) / 10000,
    stop_loss: Math.round(stopLoss * 10000) / 10000,
    take_profit: Math.round(takeProfit * 10000) / 10000,
    reason: reasons.join(' + ') || 'Technical analysis signals ' + signal,
  };
};

// Mock market data generator for demonstration
export const generateMockMarketData = (pair: string): MarketData => {
  const basePrice: { [key: string]: number } = {
    'EUR/USD': 1.0875,
    'GBP/USD': 1.2655,
    'USD/JPY': 148.5,
    'USD/CAD': 1.3642,
    'XAU/USD': 2385.5,
    'BTC/USD': 64250,
  };

  const price = basePrice[pair] || 1.0;
  const variation = (Math.random() - 0.5) * 0.02;
  const currentPrice = price * (1 + variation);

  return {
    pair,
    price: currentPrice,
    ema50: currentPrice * (0.99 + Math.random() * 0.02),
    ema200: currentPrice * (0.98 + Math.random() * 0.03),
    rsi: 30 + Math.random() * 40,
    macdLine: Math.random() * 0.002 - 0.001,
    macdSignal: Math.random() * 0.002 - 0.001,
    volatility: Math.random() * 4,
    isBreakout: Math.random() > 0.7,
    isBreakdown: Math.random() > 0.8,
  };
};