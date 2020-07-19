import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [color, setColor] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColor(color);
  };

  const reset = () => {
    setColor(initialColor);
    setEditing(false);
  };

  const updateColor = () => {
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colors.id}`, color)
      .then((res) => {
        // update the color in the colors list
        const updatedColors = colors.map((color) =>
          color.id === res.data.id ? res.data : color
        );
        updateColors(updatedColors);
        reset();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const saveColor = () => {
    axiosWithAuth()
      .post("/api/colors", color)
      .then((res) => {
        const colors = res.data;
        updateColors(colors);
        reset();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then((res) => {
        const updatedColors = colors.filter((color) => color.id !== res.data);
        updateColors(updatedColors);
        setColor(initialColor);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!(color.color && color.code.hex)) {
      return;
    }
    if (color.id) {
      updateColor();
    } else {
      saveColor();
    }
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <legend>{`${editing ? "edit" : "add"} color`}</legend>
        <label>
          color name:
          <input
            onChange={(e) => setColor({ ...color, color: e.target.value })}
            value={color.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={(e) =>
              setColor({
                ...color,
                code: { hex: e.target.value },
              })
            }
            value={color.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">{editing ? "update" : "save"}</button>
          <button onClick={reset}>cancel</button>
        </div>
      </form>
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
