import { Input, Label } from "reactstrap";
import Slider from 'rc-slider';
import { ChangeEvent } from "react";

interface ToolBarProps {
    language: string;
    handleLanguage: (language: string) => void;
    seed: string;
    handleSeed: (seed: string) => void;
    likes: number | number[];
    handleLikes: (likes: number | number[]) => void;
    review: string;
    handleReview: (review: string) => void;
}

const ToolBar = ({
    language,
    handleLanguage,
    seed,
    handleSeed,
    likes,
    handleLikes,
    review,
    handleReview
}: ToolBarProps) => {
  return (
      <div className="d-flex justify-content-between align-items-center gap-5 my-4">
          <div className="d-flex flex-column w-100">
              <Label for="language">Language</Label>
              <Input
                  id="language"
                  type="select"
                  value={language}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => handleLanguage(event.target.value)}
                  placeholder="Language"
              >
                  <option value="en">English</option>
                  <option value="ru">Russian</option>
                  <option value="fr">French</option>
              </Input>
          </div>
          <div className="d-flex flex-column w-100">
              <Label for="seed">Seed</Label>
              <div className="input-group">
                  <Input
                      id="seed"
                      value={seed}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleSeed(event.target.value)}
                      placeholder="Seed"
                      type="number"
                  />
                  <button
                      onClick={() => handleSeed(String(Math.trunc(Math.random() * 1000000)))}
                      className="input-group-text"
                  >
                      <i className="bi bi-shuffle"></i>
                  </button>
              </div>
          </div>
          <div className="d-flex flex-column w-100 align-items-center">
              <Label>Likes: {likes}</Label>
              <Slider
                  value={likes}
                  onChange={handleLikes}
                  min={0}
                  max={10}
                  step={0.1}
              />
          </div>
          <div className="d-flex flex-column w-100">
              <Label for="review">Review</Label>
              <Input
                  id="review"
                  value={review}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleReview(e.target.value)}
                  placeholder="Review"
                  type="number"
              />
          </div>
      </div>
  )
}

export default ToolBar;