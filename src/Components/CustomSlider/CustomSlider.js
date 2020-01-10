import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import { Handle } from 'rc-slider';
import Slider from 'rc-slider';
import './CustomSlider.scss';

export const CustomHandle = props => {
  const { value, dragging, index, ...restProps } = props;

  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export const CustomSlider = props => {
  const { value, handleAfterChange } = props;

  return (
    <div className="custom-slider">
      <p>Select sorting delay in milliseconds</p>
      <Slider
        min={20}
        max={2000}
        defaultValue={value}
        handle={CustomHandle}
        onAfterChange={handleAfterChange}
      />
    </div>
  );
};

export const GenerateCustomSlider = ({ CustomComponent, customProps }) => {
  return <CustomComponent {...customProps} />;
};
