# run.py
import os
import json
from crawler.coupang import get_product

categories = {
    "노트북": "노트북",
    "아이패드": "아이패드",
    "모니터": "모니터",
    "키보드": "로지텍 키보드",
    "이어폰": "에어팟",
    "웹캠": "웹캠",
    "허브": "USB 허브",
}

results = []

print("🛒 다음 쇼핑하우 크롤링 시작...\n")

for category, keyword in categories.items():
    print(f"🔍 [{category}] 검색 중...")
    item = get_product(keyword)
    if item:
        item["category"] = category
        results.append(item)
        print(f"✅ 성공: {item['title']}\n")
    else:
        print(f"❌ 실패: {keyword}\n")

# 저장
os.makedirs("data", exist_ok=True)
with open("data/kakao_items.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("🎉 크롤링 완료! 👉 data/kakao_items.json 저장됨.")
