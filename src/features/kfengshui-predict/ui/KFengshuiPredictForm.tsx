interface Props {
  houseDirection: string;
  floorNumber: string;
  locationString: string;
  error: string | null;
  onHouseDirectionChange: (v: string) => void;
  onFloorNumberChange: (v: string) => void;
  onLocationStringChange: (v: string) => void;
  onPredict: () => void;
}

const DIRECTION_PRESETS = ["남향", "북향", "동향", "서향", "남동향", "남서향", "북동향", "북서향"];

export function KFengshuiPredictForm({
  houseDirection, floorNumber, locationString, error,
  onHouseDirectionChange, onFloorNumberChange, onLocationStringChange, onPredict,
}: Props) {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
        🏠 층수 홀짝 + 창문 방향 음양 + 주소 글자수로 기운을 합산합니다.
        <br />
        <span className="text-xs text-green-500">양기(+) → 아들 / 음기(−) → 딸</span>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">집 방향</label>
        <div className="grid grid-cols-4 gap-1.5 mb-2">
          {DIRECTION_PRESETS.map((d) => (
            <button
              key={d}
              onClick={() => onHouseDirectionChange(d)}
              className={[
                "rounded-lg py-2 text-xs font-medium transition-colors",
                houseDirection === d
                  ? "bg-green-500 text-white shadow"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50",
              ].join(" ")}
            >
              {d}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={houseDirection}
          onChange={(e) => onHouseDirectionChange(e.target.value)}
          placeholder="직접 입력 (예: 남동향)"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">거주 층수</label>
        <input
          type="number"
          min={1}
          value={floorNumber}
          onChange={(e) => onFloorNumberChange(e.target.value)}
          placeholder="예: 15"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">거주 주소 <span className="font-normal text-gray-400">(글자수 계산용)</span></label>
        <input
          type="text"
          value={locationString}
          onChange={(e) => onLocationStringChange(e.target.value)}
          placeholder="예: 경기도 김포시 마산동"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-800 shadow-sm outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">{error}</p>
      )}

      <button
        onClick={onPredict}
        className="w-full rounded-xl bg-gradient-to-r from-green-500 to-teal-400 py-4 text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:opacity-90"
      >
        성별 예측하기
      </button>
    </div>
  );
}
