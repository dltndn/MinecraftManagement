import { FiPlusSquare } from "react-icons/fi";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { getTimeAgo } from "../util/calAny";
import axios from "axios";

interface ContentsObj {
  name: string;
  message: string;
  comment_count: number;
  timeStamp: number;
  bookId: number;
}

interface CommentsPara {
  bookId: number;
}

interface ContentsPara {
  data: ContentsObj;
}

interface CommentsObj {
    name: string;
    message: string;
    timeStamp: number;
}

const Comments = ({ bookId }: CommentsPara) => {
  const [comments, setComments] = useState<CommentsObj[] | null>(null);

  const TimeAgo = styled.div`
    font-size: 10px;
    color: #888;
    margin-left: 2em;
  `;

  const getComments = async () => {
    const requestData = {
      book_id: bookId,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DB_URL}/api/getComment`,
        requestData
      );
      setComments(response.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {comments === null ? (
        <>로딩중...</>
      ) : (
        <>
          {comments.map((val, index) => (
            <CommentBubble key={index}>
              <BubbleContent>
                <div style={{'font-size': '12px'}}>
                  {val.name} | {val.message}
                </div>
                <TimeAgo>{getTimeAgo(val.timeStamp)}</TimeAgo>
              </BubbleContent>
            </CommentBubble>
          ))}
        </>
      )}
    </>
  );
};

const Contents = ({ data }: ContentsPara) => {
  const [isClickedComment, setIsClickedComment] = useState<boolean>(false);

  return (
    <Item onClick={() => setIsClickedComment(!isClickedComment)}>
      <Name>{data.name}</Name>
      <TimeAgo>{getTimeAgo(data.timeStamp)}</TimeAgo>
      <Content>{data.message}</Content>
      {!isClickedComment ? (
        <CommentCountWrapper>
          <CommentFont>댓글</CommentFont>
          <CommentCount>{data.comment_count}</CommentCount>
        </CommentCountWrapper>
      ) : (
        <Comments bookId={data.bookId} />
      )}
    </Item>
  );
};

const GuestBook = () => {
  const [contents, setContents] = useState<ContentsObj[] | null>(null);

  const getGuestBookData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DB_URL}/api/getGuestBook`
      );
      setContents(response.data.result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getGuestBookData();
  }, []);

  return (
    <Container>
      <TitleContainer>
        <Title>방명록</Title>
        <AddButton>
          <FiPlusSquare size={22} />
        </AddButton>
      </TitleContainer>
      {contents === null ? (
        <>로딩중...</>
      ) : (
        <>
          {contents.map((val, index) => (
            <Contents key={index} data={val} />
          ))}
        </>
      )}
    </Container>
  );
};

export default GuestBook;

const Container = styled.div`
  margin-top: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const AddButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }
`;

const Item = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #c7dac0;
  border-radius: 5px;
  position: relative;

  &:first-child {
    margin-top: 0;
  }
`;

const Name = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Content = styled.div`
  margin-bottom: 5px;
`;

const CommentCountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  background-color: #9ad269;
  border-radius: 50%;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

const CommentFont = styled.div`
  font-size: 0.4em;
  margin-right: 1em;
`;

const TimeAgo = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
  color: #888;
  padding: 1em;
`;

const CommentBubble = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const BubbleContent = styled.div`
  background-color: #c9dfd8;
  border-radius: 10px;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 추가 버튼
// 방명록 리스트
// 방명록 구성 - 글쓴이, 내용, 댓글 수, 글 쓴 시각
// 댓글 구성 - 글쓴이, 내용, 글 쓴 시각
