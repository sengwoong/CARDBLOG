// 퍼블리싱 보조용 최소 스크립트
// 요구사항
// 1) Enter 키로 댓글 전송(콘솔 출력)
// 2) 입력 내용이 있을 때만 "댓글 등록" 버튼에 색상 강조
// 3) 최근 클릭한 사이드 카드(.sidebar__item) 하이라이트

document.addEventListener('DOMContentLoaded', function () {
    const commentInput = document.getElementById('comment-input');
    const submitButton = document.getElementById('submit-comment');
    const sidebarCards = document.querySelectorAll('.sidebar__item');

    // 1) Enter로 댓글 전송 (콘솔 출력)
    if (commentInput) {
        commentInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const content = commentInput.value.trim();
                if (!content) return;
                console.log('[댓글 등록]', content);
                commentInput.value = '';
                setButtonActive(false);
            }
        });

        // 2) 입력 변화에 따라 버튼 활성 색상 토글
        commentInput.addEventListener('input', function () {
            const hasText = commentInput.value.trim().length > 0;
            setButtonActive(hasText);
        });
    }

    // 버튼 클릭 시에도 동일 동작 (퍼블리싱 확인용)
    if (submitButton && commentInput) {
        submitButton.addEventListener('click', function (e) {
            e.preventDefault();
            const content = commentInput.value.trim();
            if (!content) return;
            console.log('[댓글 등록]', content);
            commentInput.value = '';
            setButtonActive(false);
        });
    }

    // 3) 최근 클릭한 카드 하이라이트
    let lastSelectedCard = null;
    if (sidebarCards && sidebarCards.length) {
        sidebarCards.forEach(function (card) {
            card.style.transition = 'background-color 0.2s ease';
            card.addEventListener('click', function () {
                if (lastSelectedCard && lastSelectedCard !== card) {
                    resetCardStyle(lastSelectedCard);
                }
                highlightCard(card);
                lastSelectedCard = card;
            });
        });
        // 아무것도 선택되지 않았다면 첫 번째 카드를 기본 선택
        if (!lastSelectedCard) {
            const first = sidebarCards[0];
            highlightCard(first);
            lastSelectedCard = first;
        }
    }

    // helpers
    function setButtonActive(isActive) {
        if (!submitButton) return;
        // 기본/강조 색상은 현재 톤에 맞춰 은은하게 적용
        submitButton.style.backgroundColor = isActive ? '#9bb7d1' : '#e1e5ea';
        submitButton.style.color = isActive ? '#1f2328' : '#2f3439';
    }

    function highlightCard(card) {
        card.style.backgroundColor = '#dce6ef';
        card.style.boxShadow = 'inset 0 0 0 2px #b9c8d6';
    }

    function resetCardStyle(card) {
        card.style.backgroundColor = '#eef1f4';
        card.style.boxShadow = 'none';
    }
});


