import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';

const MultiSelect = (props) => {
  if (props.allowSelectAll) {
    return (
      <ReactSelect
        {...props}
        value={
          props.value.length === props.options.length
          && props.value.length && props.options.length
            ? [props.allOption, ...props.options]
            : props.value
        }
        options={[props.allOption, ...props.options]}
        onChange={(selected, event) => {
          if (selected !== null && selected.length > 0) {
            if (selected[selected.length - 1].value === props.allOption.value) {
              return props.onChange(event.action === 'select-option' ? [props.allOption, ...props.options] : []);
            }
            let result = [];
            if (selected.length === props.options.length) {
              if (selected.includes(props.allOption)) {
                result = selected.filter(
                  (option) => option.value !== props.allOption.value,
                );
              } else if (event.action === 'select-option') {
                result = [props.allOption, ...props.options];
              }
              return props.onChange(result);
            }
          }

          return props.onChange(selected);
        }}
      />
    );
  }

  return <ReactSelect {...props} />;
};

MultiSelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
};

MultiSelect.defaultProps = {
  options: [],
  onChange: function name(params) {
    return params;
  },
  allowSelectAll: true,
  value: null,
  allOption: {
    label: 'Tất cả',
    value: '*',
  },
};

export default MultiSelect;
