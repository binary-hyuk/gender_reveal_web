import { useState } from 'react';

export type OhangGender = 'Boy' | 'Girl';

export interface OhangResult {
  gender: OhangGender;
  momBirth: string;
  dadBirth: string;
  conceptionMonth: number;
  oScore: number;
  iScore: number;
  total: number;
}

export function predictByOhang(
  momBirth: string,
  dadBirth: string,
  conceptionMonth: number
): OhangResult {
  const M_y = parseInt(momBirth.substring(0, 4));
  const M_m = parseInt(momBirth.substring(4, 6));
  const M_d = parseInt(momBirth.substring(6, 8));
  const F_y = parseInt(dadBirth.substring(0, 4));
  const F_m = parseInt(dadBirth.substring(4, 6));
  const F_d = parseInt(dadBirth.substring(6, 8));
  const C_m = conceptionMonth;

  const O_score =
    (((M_y - 3) % 10) + ((M_y - 3) % 12) + ((F_y - 3) % 10) + ((F_y - 3) % 12)) * 0.618 +
    (C_m % 5);
  const I_score =
    Math.abs(Math.sin(((M_y + F_y + M_d + F_d + C_m) * Math.PI) / 64)) * 5 +
    ((M_m + F_m) % 8);

  const total = O_score + I_score;
  return {
    gender: total > 20 ? 'Boy' : 'Girl',
    momBirth, dadBirth, conceptionMonth,
    oScore: Math.round(O_score * 100) / 100,
    iScore: Math.round(I_score * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

export interface OhangState {
  momBirth: string;
  dadBirth: string;
  conceptionMonth: string;
  result: OhangResult | null;
  error: string | null;
}
export interface OhangActions {
  setMomBirth: (v: string) => void;
  setDadBirth: (v: string) => void;
  setConceptionMonth: (v: string) => void;
  predict: () => void;
  reset: () => void;
}

export function useOhangPredictor(): OhangState & OhangActions {
  const [momBirth, setMomBirth] = useState('');
  const [dadBirth, setDadBirth] = useState('');
  const [conceptionMonth, setConceptionMonth] = useState('');
  const [result, setResult] = useState<OhangResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function predict() {
    setError(null); setResult(null);
    if (!momBirth || !dadBirth || !conceptionMonth) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    if (momBirth.length !== 8 || dadBirth.length !== 8) {
      setError('생년월일은 8자리 숫자여야 합니다. 예: 19950115');
      return;
    }
    const month = parseInt(conceptionMonth, 10);
    if (isNaN(month) || month < 1 || month > 12) {
      setError('임신 월은 1~12 사이여야 합니다.');
      return;
    }
    setResult(predictByOhang(momBirth, dadBirth, month));
  }

  function reset() {
    setResult(null); setError(null);
    setMomBirth(''); setDadBirth(''); setConceptionMonth('');
  }

  return { momBirth, dadBirth, conceptionMonth, result, error, setMomBirth, setDadBirth, setConceptionMonth, predict, reset };
}
