function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import Checkbox from '@opuscapita/react-checkbox';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import SelectableList from '../../selectable-list';
import ColumnData from '../../../models/column/column-data';
import './column.scss';

var ViewColumn =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(ViewColumn, _React$PureComponent);

  function ViewColumn(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "clickHandler", function (id, event) {
      _this.props.onClick(_this.props.index, id, event);
    });

    _defineProperty(_assertThisInitialized(_this), "checkHandler", function (id, checkState) {
       console.log('Reference Ids in Column Compounent :',_this.props.referenceIds );
       // from my deduction the referances IDS represents the path from the biggest parent to that child ,
       // for example EU child 1 referances ids are [1,10] , bcz the id=1 is general group and id=10 represnets the 'EU'  
      _this.props.onCheck(_this.props.referenceIds.slice(), id, checkState);
    });

    _defineProperty(_assertThisInitialized(_this), "checkAllHandler", function (e) {
      console.log("I'm in the column component !");
      console.log('state =' , _this.state , 'props =', _this.props);
      let anotherElemIsClicked = false;
      let theClickedButtonName='';
      if(e.target.nodeName=='svg'){
        console.log('E parent =',e.target.parentNode);
        console.log('the actual =', e.target.parentNode.nextSibling.firstChild.innerHTML);
        theClickedButtonName=e.target.parentNode.nextSibling.firstChild.innerHTML;
      }else if(e.target.nodeName==='path'){
        console.log('E parent =',e.target.parentNode.parentNode);
        console.log('the actual =', e.target.parentNode.parentNode.nextSibling.firstChild.innerHTML);
        theClickedButtonName=e.target.parentNode.parentNode.nextSibling.firstChild.innerHTML;
      }else{
        console.log('E PARENT ANOTHER !', e.target.nodeName);
        anotherElemIsClicked=true;
      }
  
      if(!anotherElemIsClicked){
        var newState = e.target.checked;
        //it's our new feature ! 
        if(e.target.checked===undefined){
          console.log('the logo is the empty checkbox :' , e.target.innerHTML.includes('M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z'));
          newState=e.target.innerHTML.includes('M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-6 400H54c-3.3 0-6-2.7-6-6V86c0-3.3 2.7-6 6-6h340c3.3 0 6 2.7 6 6v340c0 3.3-2.7 6-6 6z');
          console.log('SELECTED Id =', _this.props.data.items.filter(item=>item.name==theClickedButtonName)[0].id);
          const selectedId=_this.props.data.items.filter(item=>item.name==theClickedButtonName)[0].id;
          _this.props.onCheckAll([..._this.props.referenceIds ,selectedId].slice(), newState);
        }else{
          _this.props.onCheckAll(_this.props.referenceIds , newState);
          _this.setState({
            checkedAll: newState
          });
        }
        console.log('NEW STATE =', newState);
      }



    });

    _defineProperty(_assertThisInitialized(_this), "renderWrapperFunction", function (index) {
      return function (item, defaultRenderFunction) {
        return _this.props.itemRenderFunction(index, item, defaultRenderFunction);
      };
    });

    _this.id = shortid();
    _this.state = {
      checkedAll: _this.props.checkedAll
    };
    return _this;
  }

  var _proto = ViewColumn.prototype;

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.checkedAll !== this.props.checkedAll) {
      this.setState({
        checkedAll: nextProps.checkedAll
      });
    }
  };

  _proto.render = function render() {
    // TODO: 'All' text should be passed here to show translated text.
    var disabledProperty = this.props.checkedAllDisabled ? {
      disabled: true
    } : null;
    return React.createElement("div", {
      className: "oc-hierarchy-selector-column"
    }, React.createElement("div", {
      className: "oc-hierarchy-selector-column-all"
    }, !this.props.checkedAllHidden ? React.createElement(Checkbox, _extends({
      id: "oc-hierarchy-selector-select-all-" + this.id,
      name: "oc-hierarchy-selector-select-all-" + this.id,
      onChange: this.checkAllHandler,
      checked: this.state.checkedAll,
      label: this.props.allLabel
    }, disabledProperty)) : null), React.createElement(SelectableList, {
      referenceIds: this.props.referenceIds,
      checkAllHandler  :this.checkAllHandler, 
      // if true : the icon will be changed
      checkedAll: this.props.checkedAll,
      checkDisabled: this.state.checkedAll,
      checkedIds: this.props.checkedIds,
      items: this.props.data.items,
      itemRenderFunction: this.props.itemRenderFunction ? this.renderWrapperFunction(this.props.index) : null,
      selectedId: this.props.selectedId,
      onCheck: this.checkHandler,
      onClick: this.clickHandler
    }));
  };

  return ViewColumn;
}(React.PureComponent);

export { ViewColumn as default };
ViewColumn.defaultProps = {
  allLabel: 'All',
  checkedAll: false,
  checkedAllDisabled: false,
  checkedAllHidden: false,
  data: new ColumnData(),
  itemRenderFunction: null,
  selectedId: null,
  referenceIds: [],
  onCheck: function onCheck() {},
  onCheckAll: function onCheckAll() {},
  onClick: function onClick() {},
  checkedIds: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvY29sdW1uL2NvbHVtbi5jb21wb25lbnQuanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiQ2hlY2tib3giLCJQcm9wVHlwZXMiLCJzaG9ydGlkIiwiU2VsZWN0YWJsZUxpc3QiLCJDb2x1bW5EYXRhIiwiVmlld0NvbHVtbiIsInByb3BzIiwiaWQiLCJldmVudCIsIm9uQ2xpY2siLCJpbmRleCIsImNoZWNrU3RhdGUiLCJvbkNoZWNrIiwicmVmZXJlbmNlSWRzIiwic2xpY2UiLCJlIiwibmV3U3RhdGUiLCJ0YXJnZXQiLCJjaGVja2VkIiwib25DaGVja0FsbCIsInNldFN0YXRlIiwiY2hlY2tlZEFsbCIsIml0ZW0iLCJkZWZhdWx0UmVuZGVyRnVuY3Rpb24iLCJpdGVtUmVuZGVyRnVuY3Rpb24iLCJzdGF0ZSIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJyZW5kZXIiLCJkaXNhYmxlZFByb3BlcnR5IiwiY2hlY2tlZEFsbERpc2FibGVkIiwiZGlzYWJsZWQiLCJjaGVja2VkQWxsSGlkZGVuIiwiY2hlY2tBbGxIYW5kbGVyIiwiYWxsTGFiZWwiLCJjaGVja2VkSWRzIiwiZGF0YSIsIml0ZW1zIiwicmVuZGVyV3JhcHBlckZ1bmN0aW9uIiwic2VsZWN0ZWRJZCIsImNoZWNrSGFuZGxlciIsImNsaWNrSGFuZGxlciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsNEJBQXJCO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixZQUF0QjtBQUNBLE9BQU9DLE9BQVAsTUFBb0IsU0FBcEI7QUFFQSxPQUFPQyxjQUFQLE1BQTJCLHVCQUEzQjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsb0NBQXZCO0FBRUEsT0FBTyxlQUFQOztJQUVxQkMsVTs7Ozs7QUFDbkIsc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDakIsNENBQU1BLEtBQU47O0FBRGlCLG1FQWdCSixVQUFDQyxFQUFELEVBQUtDLEtBQUwsRUFBZTtBQUM1QixZQUFLRixLQUFMLENBQVdHLE9BQVgsQ0FBbUIsTUFBS0gsS0FBTCxDQUFXSSxLQUE5QixFQUFxQ0gsRUFBckMsRUFBeUNDLEtBQXpDO0FBQ0QsS0FsQmtCOztBQUFBLG1FQW9CSixVQUFDRCxFQUFELEVBQUtJLFVBQUwsRUFBb0I7QUFDakMsWUFBS0wsS0FBTCxDQUFXTSxPQUFYLENBQW1CLE1BQUtOLEtBQUwsQ0FBV08sWUFBWCxDQUF3QkMsS0FBeEIsRUFBbkIsRUFBb0RQLEVBQXBELEVBQXdESSxVQUF4RDtBQUNELEtBdEJrQjs7QUFBQSxzRUF3QkQsVUFBQ0ksQ0FBRCxFQUFPO0FBQ3ZCLFVBQU1DLFFBQVEsR0FBR0QsQ0FBQyxDQUFDRSxNQUFGLENBQVNDLE9BQTFCOztBQUNBLFlBQUtaLEtBQUwsQ0FBV2EsVUFBWCxDQUFzQixNQUFLYixLQUFMLENBQVdPLFlBQVgsQ0FBd0JDLEtBQXhCLEVBQXRCLEVBQXVERSxRQUF2RDs7QUFDQSxZQUFLSSxRQUFMLENBQWM7QUFDWkMsUUFBQUEsVUFBVSxFQUFFTDtBQURBLE9BQWQ7QUFHRCxLQTlCa0I7O0FBQUEsNEVBZ0NLLFVBQUFOLEtBQUs7QUFBQSxhQUFJLFVBQUNZLElBQUQsRUFBT0MscUJBQVA7QUFBQSxlQUMvQixNQUFLakIsS0FBTCxDQUFXa0Isa0JBQVgsQ0FBOEJkLEtBQTlCLEVBQXFDWSxJQUFyQyxFQUEyQ0MscUJBQTNDLENBRCtCO0FBQUEsT0FBSjtBQUFBLEtBaENWOztBQUVqQixVQUFLaEIsRUFBTCxHQUFVTCxPQUFPLEVBQWpCO0FBQ0EsVUFBS3VCLEtBQUwsR0FBYTtBQUNYSixNQUFBQSxVQUFVLEVBQUUsTUFBS2YsS0FBTCxDQUFXZTtBQURaLEtBQWI7QUFIaUI7QUFNbEI7Ozs7U0FFREsseUIsR0FBQSxtQ0FBMEJDLFNBQTFCLEVBQXFDO0FBQ25DLFFBQUlBLFNBQVMsQ0FBQ04sVUFBVixLQUF5QixLQUFLZixLQUFMLENBQVdlLFVBQXhDLEVBQW9EO0FBQ2xELFdBQUtELFFBQUwsQ0FBYztBQUNaQyxRQUFBQSxVQUFVLEVBQUVNLFNBQVMsQ0FBQ047QUFEVixPQUFkO0FBR0Q7QUFDRixHOztTQXFCRE8sTSxHQUFBLGtCQUFTO0FBQ1A7QUFDQSxRQUFNQyxnQkFBZ0IsR0FBRyxLQUFLdkIsS0FBTCxDQUFXd0Isa0JBQVgsR0FBZ0M7QUFBRUMsTUFBQUEsUUFBUSxFQUFFO0FBQVosS0FBaEMsR0FBcUQsSUFBOUU7QUFDQSxXQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNFO0FBQUssTUFBQSxTQUFTLEVBQUM7QUFBZixPQUNHLENBQUMsS0FBS3pCLEtBQUwsQ0FBVzBCLGdCQUFaLEdBQ0Msb0JBQUMsUUFBRDtBQUNFLE1BQUEsRUFBRSx3Q0FBc0MsS0FBS3pCLEVBRC9DO0FBRUUsTUFBQSxJQUFJLHdDQUFzQyxLQUFLQSxFQUZqRDtBQUdFLE1BQUEsUUFBUSxFQUFFLEtBQUswQixlQUhqQjtBQUlFLE1BQUEsT0FBTyxFQUFFLEtBQUtSLEtBQUwsQ0FBV0osVUFKdEI7QUFLRSxNQUFBLEtBQUssRUFBRSxLQUFLZixLQUFMLENBQVc0QjtBQUxwQixPQU1NTCxnQkFOTixFQURELEdBU0csSUFWTixDQURGLEVBY0Usb0JBQUMsY0FBRDtBQUNFLE1BQUEsVUFBVSxFQUFFLEtBQUt2QixLQUFMLENBQVdlLFVBRHpCO0FBRUUsTUFBQSxhQUFhLEVBQUUsS0FBS0ksS0FBTCxDQUFXSixVQUY1QjtBQUdFLE1BQUEsVUFBVSxFQUFFLEtBQUtmLEtBQUwsQ0FBVzZCLFVBSHpCO0FBSUUsTUFBQSxLQUFLLEVBQUUsS0FBSzdCLEtBQUwsQ0FBVzhCLElBQVgsQ0FBZ0JDLEtBSnpCO0FBS0UsTUFBQSxrQkFBa0IsRUFBRSxLQUFLL0IsS0FBTCxDQUFXa0Isa0JBQVgsR0FDQSxLQUFLYyxxQkFBTCxDQUEyQixLQUFLaEMsS0FBTCxDQUFXSSxLQUF0QyxDQURBLEdBQytDLElBTnJFO0FBT0UsTUFBQSxVQUFVLEVBQUUsS0FBS0osS0FBTCxDQUFXaUMsVUFQekI7QUFRRSxNQUFBLE9BQU8sRUFBRSxLQUFLQyxZQVJoQjtBQVNFLE1BQUEsT0FBTyxFQUFFLEtBQUtDO0FBVGhCLE1BZEYsQ0FERjtBQTRCRCxHOzs7RUFuRXFDMUMsS0FBSyxDQUFDMkMsYTs7U0FBekJyQyxVO0FBc0ZyQkEsVUFBVSxDQUFDc0MsWUFBWCxHQUEwQjtBQUN4QlQsRUFBQUEsUUFBUSxFQUFFLEtBRGM7QUFFeEJiLEVBQUFBLFVBQVUsRUFBRSxLQUZZO0FBR3hCUyxFQUFBQSxrQkFBa0IsRUFBRSxLQUhJO0FBSXhCRSxFQUFBQSxnQkFBZ0IsRUFBRSxLQUpNO0FBS3hCSSxFQUFBQSxJQUFJLEVBQUUsSUFBSWhDLFVBQUosRUFMa0I7QUFNeEJvQixFQUFBQSxrQkFBa0IsRUFBRSxJQU5JO0FBT3hCZSxFQUFBQSxVQUFVLEVBQUUsSUFQWTtBQVF4QjFCLEVBQUFBLFlBQVksRUFBRSxFQVJVO0FBU3hCRCxFQUFBQSxPQUFPLEVBQUUsbUJBQU0sQ0FBRSxDQVRPO0FBVXhCTyxFQUFBQSxVQUFVLEVBQUUsc0JBQU0sQ0FBRSxDQVZJO0FBV3hCVixFQUFBQSxPQUFPLEVBQUUsbUJBQU0sQ0FBRSxDQVhPO0FBWXhCMEIsRUFBQUEsVUFBVSxFQUFFO0FBWlksQ0FBMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IENoZWNrYm94IGZyb20gJ0BvcHVzY2FwaXRhL3JlYWN0LWNoZWNrYm94JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc2hvcnRpZCBmcm9tICdzaG9ydGlkJztcblxuaW1wb3J0IFNlbGVjdGFibGVMaXN0IGZyb20gJy4uLy4uL3NlbGVjdGFibGUtbGlzdCc7XG5pbXBvcnQgQ29sdW1uRGF0YSBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29sdW1uL2NvbHVtbi1kYXRhJztcblxuaW1wb3J0ICcuL2NvbHVtbi5zY3NzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0NvbHVtbiBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLmlkID0gc2hvcnRpZCgpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBjaGVja2VkQWxsOiB0aGlzLnByb3BzLmNoZWNrZWRBbGwsXG4gICAgfTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKG5leHRQcm9wcy5jaGVja2VkQWxsICE9PSB0aGlzLnByb3BzLmNoZWNrZWRBbGwpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjaGVja2VkQWxsOiBuZXh0UHJvcHMuY2hlY2tlZEFsbCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNsaWNrSGFuZGxlciA9IChpZCwgZXZlbnQpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy5pbmRleCwgaWQsIGV2ZW50KTtcbiAgfVxuXG4gIGNoZWNrSGFuZGxlciA9IChpZCwgY2hlY2tTdGF0ZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25DaGVjayh0aGlzLnByb3BzLnJlZmVyZW5jZUlkcy5zbGljZSgpLCBpZCwgY2hlY2tTdGF0ZSk7XG4gIH1cblxuICBjaGVja0FsbEhhbmRsZXIgPSAoZSkgPT4ge1xuICAgIGNvbnN0IG5ld1N0YXRlID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tBbGwodGhpcy5wcm9wcy5yZWZlcmVuY2VJZHMuc2xpY2UoKSwgbmV3U3RhdGUpO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2hlY2tlZEFsbDogbmV3U3RhdGUsXG4gICAgfSk7XG4gIH1cblxuICByZW5kZXJXcmFwcGVyRnVuY3Rpb24gPSBpbmRleCA9PiAoaXRlbSwgZGVmYXVsdFJlbmRlckZ1bmN0aW9uKSA9PlxuICAgIHRoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uKGluZGV4LCBpdGVtLCBkZWZhdWx0UmVuZGVyRnVuY3Rpb24pO1xuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBUT0RPOiAnQWxsJyB0ZXh0IHNob3VsZCBiZSBwYXNzZWQgaGVyZSB0byBzaG93IHRyYW5zbGF0ZWQgdGV4dC5cbiAgICBjb25zdCBkaXNhYmxlZFByb3BlcnR5ID0gdGhpcy5wcm9wcy5jaGVja2VkQWxsRGlzYWJsZWQgPyB7IGRpc2FibGVkOiB0cnVlIH0gOiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci1jb2x1bW5cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItY29sdW1uLWFsbFwiPlxuICAgICAgICAgIHshdGhpcy5wcm9wcy5jaGVja2VkQWxsSGlkZGVuID9cbiAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICBpZD17YG9jLWhpZXJhcmNoeS1zZWxlY3Rvci1zZWxlY3QtYWxsLSR7dGhpcy5pZH1gfVxuICAgICAgICAgICAgICBuYW1lPXtgb2MtaGllcmFyY2h5LXNlbGVjdG9yLXNlbGVjdC1hbGwtJHt0aGlzLmlkfWB9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmNoZWNrQWxsSGFuZGxlcn1cbiAgICAgICAgICAgICAgY2hlY2tlZD17dGhpcy5zdGF0ZS5jaGVja2VkQWxsfVxuICAgICAgICAgICAgICBsYWJlbD17dGhpcy5wcm9wcy5hbGxMYWJlbH1cbiAgICAgICAgICAgICAgey4uLmRpc2FibGVkUHJvcGVydHl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPFNlbGVjdGFibGVMaXN0XG4gICAgICAgICAgY2hlY2tlZEFsbD17dGhpcy5wcm9wcy5jaGVja2VkQWxsfVxuICAgICAgICAgIGNoZWNrRGlzYWJsZWQ9e3RoaXMuc3RhdGUuY2hlY2tlZEFsbH1cbiAgICAgICAgICBjaGVja2VkSWRzPXt0aGlzLnByb3BzLmNoZWNrZWRJZHN9XG4gICAgICAgICAgaXRlbXM9e3RoaXMucHJvcHMuZGF0YS5pdGVtc31cbiAgICAgICAgICBpdGVtUmVuZGVyRnVuY3Rpb249e3RoaXMucHJvcHMuaXRlbVJlbmRlckZ1bmN0aW9uID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyV3JhcHBlckZ1bmN0aW9uKHRoaXMucHJvcHMuaW5kZXgpIDogbnVsbH1cbiAgICAgICAgICBzZWxlY3RlZElkPXt0aGlzLnByb3BzLnNlbGVjdGVkSWR9XG4gICAgICAgICAgb25DaGVjaz17dGhpcy5jaGVja0hhbmRsZXJ9XG4gICAgICAgICAgb25DbGljaz17dGhpcy5jbGlja0hhbmRsZXJ9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cblZpZXdDb2x1bW4ucHJvcFR5cGVzID0ge1xuICBhbGxMYWJlbDogUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLmVsZW1lbnRdKSxcbiAgY2hlY2tlZElkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG4gIGNoZWNrZWRBbGw6IFByb3BUeXBlcy5ib29sLFxuICBjaGVja2VkQWxsRGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICBjaGVja2VkQWxsSGlkZGVuOiBQcm9wVHlwZXMuYm9vbCxcbiAgaW5kZXg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgZGF0YTogUHJvcFR5cGVzLmluc3RhbmNlT2YoQ29sdW1uRGF0YSksXG4gIHNlbGVjdGVkSWQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHJlZmVyZW5jZUlkczogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm9uZU9mVHlwZShbUHJvcFR5cGVzLnN0cmluZywgUHJvcFR5cGVzLm51bWJlcl0pKSxcbiAgb25DaGVjazogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hlY2tBbGw6IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsaWNrOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cblZpZXdDb2x1bW4uZGVmYXVsdFByb3BzID0ge1xuICBhbGxMYWJlbDogJ0FsbCcsXG4gIGNoZWNrZWRBbGw6IGZhbHNlLFxuICBjaGVja2VkQWxsRGlzYWJsZWQ6IGZhbHNlLFxuICBjaGVja2VkQWxsSGlkZGVuOiBmYWxzZSxcbiAgZGF0YTogbmV3IENvbHVtbkRhdGEoKSxcbiAgaXRlbVJlbmRlckZ1bmN0aW9uOiBudWxsLFxuICBzZWxlY3RlZElkOiBudWxsLFxuICByZWZlcmVuY2VJZHM6IFtdLFxuICBvbkNoZWNrOiAoKSA9PiB7fSxcbiAgb25DaGVja0FsbDogKCkgPT4ge30sXG4gIG9uQ2xpY2s6ICgpID0+IHt9LFxuICBjaGVja2VkSWRzOiBbXSxcbn07XG4iXX0=