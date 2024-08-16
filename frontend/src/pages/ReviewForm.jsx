import { useState } from "react";
import * as S from "../styles/ReviewForm.styles";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/index.js";

export const ReviewForm = ({ bankName, productName }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    if (review.length < 20) {
      setPopupMessage("20자 이상으로 작성해주세요");
      setShowPopup(true);
      return;
    }
    navigate("/detailed", {
      state: {
        reviewData: { rating, review },
        bank: { name: bankName, logoKey: "kb" },
      },
    });
  };

  const handleConfirmClick = () => {
    setShowPopup(false);
  };

  return (
    <div className="ProductPage">
      <Header />
      <S.ReviewFormContainer>
        {showPopup && (
          <S.Popup>
            <p>{popupMessage}</p>
            <S.ConfirmButton onClick={handleConfirmClick}>확인</S.ConfirmButton>
          </S.Popup>
        )}
        <S.FormHeader>
          <span>리뷰 쓰기</span>
          <S.CancelButton to="/detailed">취소</S.CancelButton>
        </S.FormHeader>
        <S.BankInfo>
          <img src={`${bankName}.png`} alt={`${bankName} 로고`} />
          <div>
            <p>상품명: {productName}</p>
            <p>별점 평가</p>
            <S.StarRating>
              {[...Array(5)].map((_, index) => (
                <S.Star
                  key={index}
                  selected={index < rating}
                  onClick={() => handleRatingChange(index + 1)}
                >
                  ★
                </S.Star>
              ))}
            </S.StarRating>
          </div>
        </S.BankInfo>
        <S.ReviewTextArea
          value={review}
          onChange={handleReviewChange}
          placeholder="자세하고 솔직한 리뷰 작성 부탁드립니다. (최소 20자 이상)"
        />
        <S.SubmitButton onClick={handleSubmit}>완료</S.SubmitButton>
      </S.ReviewFormContainer>
    </div>
  );
};
