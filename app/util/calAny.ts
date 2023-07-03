
export const getTimeAgo = (timestamp: number) => {
    const currentTime = Math.floor(Date.now() / 1000); // 현재 시간의 타임스탬프 (초단위)
    const elapsedSeconds = currentTime - timestamp;

    if (elapsedSeconds < 60) {
      // 1분 미만일 경우
      return `${elapsedSeconds}초 전`;
    } else if (elapsedSeconds < 3600) {
      // 1시간 미만일 경우
      const elapsedMinutes = Math.floor(elapsedSeconds / 60);
      return `${elapsedMinutes}분 전`;
    } else if (elapsedSeconds < 86400) {
      // 24시간 미만일 경우
      const elapsedHours = Math.floor(elapsedSeconds / 3600);
      return `${elapsedHours}시간 전`;
    } else {
      // 24시간 이상일 경우
      const currentDate = new Date();
      const pastDate = new Date(timestamp * 1000); // 입력된 타임스탬프에 대한 날짜 객체

      const month = pastDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줌
      const day = pastDate.getDate();

      return `${month}월 ${day}일`;
    }
  };