function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '@opuscapita/react-searchbar';
import Spinner from '../spinner';
import { dataSourceProviderType } from '../../services/types';
import ColumnList from '../../models/column/column-list';
import ViewColumn from './column/column.component';

var ViewTabContent =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(ViewTabContent, _React$PureComponent);

  function ViewTabContent(_props) {
    var _this;

    _this = _React$PureComponent.call(this, _props) || this;

    _defineProperty(_assertThisInitialized(_this), "getIdOfFirstItem", function (props) {
      var dataSourceProvider = props.dataSourceProvider;
      var firstItem = dataSourceProvider.getFirstItem();
      if (firstItem === null || !firstItem.id) return null;
      return firstItem.id;
    });

    _defineProperty(_assertThisInitialized(_this), "getContent", function () {
      _this.refreshContent();

      var list = _this.columns.list || [];
      var selectedPath = _this.columns.selectedPath || [];
      var parentIds = [];
      var anyCheckedAll = false;
      return React.createElement("div", {
        className: "oc-hierarchy-selector-tab-content"
      }, React.createElement("div", {
        className: "oc-hierarchy-selector-tab-search-bar"
      }, React.createElement(SearchBar, {
        defaltValue: _this.state.searchingFor,
        isDynamic: true,
        isTooltipEnabled: !!_this.props.searchTooltip,
        minChars: 2,
        translations: {
          tooltip: _this.props.searchTooltip,
          searchPlaceHolder: _this.props.searchPlaceHolder
        },
        onSearch: _this.searchChangeHandler,
        onClear: _this.searchClearHandler
      })), React.createElement("div", {
        className: "oc-hierarchy-selector-column-wrapper"
      }, Object.keys(list).map(function (key) {
        var data = list[key];
        var selectedId = selectedPath[key] ? String(selectedPath[key]) : null;
        var parentReferenceIds = parentIds.slice();

        var isCheckedAll = _this.getIsCheckedAll(parentIds);

        var checkedIds = isCheckedAll ? [] : _this.getCheckedIds(parentIds, data);
        anyCheckedAll = anyCheckedAll || isCheckedAll;
        parentIds.push(selectedId);
        return React.createElement(ViewColumn, {
          allLabel: _this.props.allLabel,
          checkedAll: anyCheckedAll || isCheckedAll,
          checkedAllDisabled: anyCheckedAll && !isCheckedAll,
          checkedAllHidden: Number(key) === 0,
          checkedIds: checkedIds,
          data: data,
          index: Number(key) + 1,
          itemRenderFunction: _this.props.listItemRenderFunction,
          key: Number(key) + 1,
          referenceIds: parentReferenceIds,
          selectedId: selectedId,
          onCheck: _this.checkHandler,
          onCheckAll: _this.checkAllHandler,
          onClick: _this.clickHandler
        });
      })));
    });

    _defineProperty(_assertThisInitialized(_this), "getSpinner", function () {
      return React.createElement("div", {
        className: "oc-hierarchy-selector-tab-content"
      }, React.createElement(Spinner, null));
    });

    _defineProperty(_assertThisInitialized(_this), "clickHandler", function (level, id) {
      _this.setState({
        selectedColumn: level,
        selectedId: id
      });
    });

    _defineProperty(_assertThisInitialized(_this), "checkHandler", function (referenceIds, id, checkState) {
      var checkedItemHashList = _this.props.dataSourceProvider.getChecked();

      if (checkState) {
        checkedItemHashList.add(referenceIds, id);
      } else {
        checkedItemHashList.remove(referenceIds, id);
      }

      _this.setState({
        checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
      });

      _this.props.onCheckListChange(checkedItemHashList);
    });

    _defineProperty(_assertThisInitialized(_this), "checkAllHandler", function (referenceIds, checkState) {
      console.log('referenceIds =', referenceIds);
      console.log('checkState =', checkState);
      var parentIds = referenceIds.slice();
      var id = parentIds.pop();
      if (!id) throw new Error('There is no selected parent element to perform checking of all elements');

      var checkedItemHashList = _this.props.dataSourceProvider.getChecked();

      if (checkState) {
        checkedItemHashList.addAll(parentIds, id);
      } else {
        checkedItemHashList.removeAll(parentIds, id);
      }

      _this.setState({
        checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
      });

      _this.props.onCheckListChange(checkedItemHashList);
    });

    _defineProperty(_assertThisInitialized(_this), "searchChangeHandler", function (searchingFor) {
      return _this.setState({
        searchingFor: searchingFor
      });
    });

    _defineProperty(_assertThisInitialized(_this), "searchClearHandler", function () {
      _this.setState({
        searchingFor: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "loadData", function (props) {
      var dataSourceProvider = props.dataSourceProvider,
          onCheckListChange = props.onCheckListChange;
      dataSourceProvider.loadData().then(function () {
        var checkedItemHashList = dataSourceProvider.getChecked();
        var stateObject = {
          isDataLoaded: dataSourceProvider.isLoaded,
          checkedItemsLastUpdate: checkedItemHashList.getLastUpdateStamp()
        };

        var idOfFirstItem = _this.getIdOfFirstItem(props);

        if (idOfFirstItem !== null) {
          stateObject.selectedColumn = 1;
          stateObject.selectedId = idOfFirstItem;
        }

        _this.setState(stateObject);

        onCheckListChange(checkedItemHashList);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "refreshContent", function () {
      var _this$state = _this.state,
          selectedColumn = _this$state.selectedColumn,
          selectedId = _this$state.selectedId,
          searchingFor = _this$state.searchingFor;

      _this.columns.setSearchingFor(searchingFor);

      _this.columns.refresh(selectedColumn, selectedId);
    });

    var isDataLoaded = _props.dataSourceProvider.isLoaded;

    var _idOfFirstItem = _this.getIdOfFirstItem(_props);

    _this.state = {
      isDataLoaded: isDataLoaded,
      checkedItemsLastUpdate: 0,
      searchingFor: '',
      selectedColumn: _idOfFirstItem !== null ? 1 : 0,
      selectedId: _idOfFirstItem
    };
    _this.columns = new ColumnList(_props.dataSourceProvider);
    return _this;
  }

  var _proto = ViewTabContent.prototype;

  _proto.componentWillMount = function componentWillMount() {
    if (!this.state.isDataLoaded) {
      this.loadData(this.props);
    }
  };

  _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var isLoaded = nextProps.dataSourceProvider.isLoaded;
    var checked = nextProps.dataSourceProvider.getChecked();

    if (this.state.isDataLoaded !== isLoaded) {
      this.setState({
        isDataLoaded: isLoaded
      });
    }

    if (!isLoaded) {
      this.loadData(nextProps);
    }

    if (checked) {
      var lastUpdated = checked.getLastUpdateStamp();

      if (lastUpdated !== this.state.checkedItemsLastUpdate) {
        this.setState({
          checkedItemsLastUpdate: lastUpdated
        });
      }
    }
  };

  _proto.getIsCheckedAll = function getIsCheckedAll(parentIds) {
    var checkedItemHashList = this.props.dataSourceProvider.getChecked();
    return checkedItemHashList.getIsCheckedAll(parentIds);
  };

  _proto.getCheckedIds = function getCheckedIds(parentIds, data) {
    var _this2 = this;

    var checkedItemHashList = this.props.dataSourceProvider.getChecked();
    var result = checkedItemHashList.getCheckedItems(parentIds).map(function (i) {
      return i.id;
    }); // Adds all items that have checkedAll in children

    if (data && Array.isArray(data.items)) {
      data.items.forEach(function (item) {
        var currentParentIds = parentIds.slice();
        currentParentIds.push(item.id);

        if (_this2.getIsCheckedAll(currentParentIds)) {
          result.push(item.id);
        }
      });
    }

    return result;
  };

  _proto.render = function render() {
    return this.state.isDataLoaded ? this.getContent() : this.getSpinner();
  };

  return ViewTabContent;
}(React.PureComponent);

export { ViewTabContent as default };
ViewTabContent.defaultProps = {
  allLabel: 'All',
  listItemRenderFunction: null,
  searchPlaceHolder: 'Search...',
  searchTooltip: null,
  onCheckListChange: function onCheckListChange() {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3ZpZXcvdGFiLWNvbnRlbnQuY29tcG9uZW50LmpzeCJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIlNlYXJjaEJhciIsIlNwaW5uZXIiLCJkYXRhU291cmNlUHJvdmlkZXJUeXBlIiwiQ29sdW1uTGlzdCIsIlZpZXdDb2x1bW4iLCJWaWV3VGFiQ29udGVudCIsInByb3BzIiwiZGF0YVNvdXJjZVByb3ZpZGVyIiwiZmlyc3RJdGVtIiwiZ2V0Rmlyc3RJdGVtIiwiaWQiLCJyZWZyZXNoQ29udGVudCIsImxpc3QiLCJjb2x1bW5zIiwic2VsZWN0ZWRQYXRoIiwicGFyZW50SWRzIiwiYW55Q2hlY2tlZEFsbCIsInN0YXRlIiwic2VhcmNoaW5nRm9yIiwic2VhcmNoVG9vbHRpcCIsInRvb2x0aXAiLCJzZWFyY2hQbGFjZUhvbGRlciIsInNlYXJjaENoYW5nZUhhbmRsZXIiLCJzZWFyY2hDbGVhckhhbmRsZXIiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwiZGF0YSIsInNlbGVjdGVkSWQiLCJTdHJpbmciLCJwYXJlbnRSZWZlcmVuY2VJZHMiLCJzbGljZSIsImlzQ2hlY2tlZEFsbCIsImdldElzQ2hlY2tlZEFsbCIsImNoZWNrZWRJZHMiLCJnZXRDaGVja2VkSWRzIiwicHVzaCIsImFsbExhYmVsIiwiTnVtYmVyIiwibGlzdEl0ZW1SZW5kZXJGdW5jdGlvbiIsImNoZWNrSGFuZGxlciIsImNoZWNrQWxsSGFuZGxlciIsImNsaWNrSGFuZGxlciIsImxldmVsIiwic2V0U3RhdGUiLCJzZWxlY3RlZENvbHVtbiIsInJlZmVyZW5jZUlkcyIsImNoZWNrU3RhdGUiLCJjaGVja2VkSXRlbUhhc2hMaXN0IiwiZ2V0Q2hlY2tlZCIsImFkZCIsInJlbW92ZSIsImNoZWNrZWRJdGVtc0xhc3RVcGRhdGUiLCJnZXRMYXN0VXBkYXRlU3RhbXAiLCJvbkNoZWNrTGlzdENoYW5nZSIsInBvcCIsIkVycm9yIiwiYWRkQWxsIiwicmVtb3ZlQWxsIiwibG9hZERhdGEiLCJ0aGVuIiwic3RhdGVPYmplY3QiLCJpc0RhdGFMb2FkZWQiLCJpc0xvYWRlZCIsImlkT2ZGaXJzdEl0ZW0iLCJnZXRJZE9mRmlyc3RJdGVtIiwic2V0U2VhcmNoaW5nRm9yIiwicmVmcmVzaCIsImNvbXBvbmVudFdpbGxNb3VudCIsImNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMiLCJuZXh0UHJvcHMiLCJjaGVja2VkIiwibGFzdFVwZGF0ZWQiLCJyZXN1bHQiLCJnZXRDaGVja2VkSXRlbXMiLCJpIiwiQXJyYXkiLCJpc0FycmF5IiwiaXRlbXMiLCJmb3JFYWNoIiwiaXRlbSIsImN1cnJlbnRQYXJlbnRJZHMiLCJyZW5kZXIiLCJnZXRDb250ZW50IiwiZ2V0U3Bpbm5lciIsIlB1cmVDb21wb25lbnQiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBRUEsT0FBT0EsS0FBUCxNQUFrQixPQUFsQjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsWUFBdEI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLDZCQUF0QjtBQUVBLE9BQU9DLE9BQVAsTUFBb0IsWUFBcEI7QUFDQSxTQUFTQyxzQkFBVCxRQUF1QyxzQkFBdkM7QUFDQSxPQUFPQyxVQUFQLE1BQXVCLGlDQUF2QjtBQUNBLE9BQU9DLFVBQVAsTUFBdUIsMkJBQXZCOztJQUVxQkMsYzs7Ozs7QUFDbkIsMEJBQVlDLE1BQVosRUFBbUI7QUFBQTs7QUFDakIsNENBQU1BLE1BQU47O0FBRGlCLHVFQStDQSxVQUFDQSxLQUFELEVBQVc7QUFBQSxVQUNwQkMsa0JBRG9CLEdBQ0dELEtBREgsQ0FDcEJDLGtCQURvQjtBQUU1QixVQUFNQyxTQUFTLEdBQUdELGtCQUFrQixDQUFDRSxZQUFuQixFQUFsQjtBQUNBLFVBQUlELFNBQVMsS0FBSyxJQUFkLElBQXNCLENBQUNBLFNBQVMsQ0FBQ0UsRUFBckMsRUFBeUMsT0FBTyxJQUFQO0FBRXpDLGFBQU9GLFNBQVMsQ0FBQ0UsRUFBakI7QUFDRCxLQXJE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QUFDO0FBQUEsYUFBSUEsQ0FBQyxDQUFDbEUsRUFBTjtBQUFBLEtBQXBELENBQWYsQ0FGNkIsQ0FJN0I7O0FBQ0EsUUFBSWtCLElBQUksSUFBSWlELEtBQUssQ0FBQ0MsT0FBTixDQUFjbEQsSUFBSSxDQUFDbUQsS0FBbkIsQ0FBWixFQUF1QztBQUNyQ25ELE1BQUFBLElBQUksQ0FBQ21ELEtBQUwsQ0FBV0MsT0FBWCxDQUFtQixVQUFDQyxJQUFELEVBQVU7QUFDM0IsWUFBTUMsZ0JBQWdCLEdBQUduRSxTQUFTLENBQUNpQixLQUFWLEVBQXpCO0FBQ0FrRCxRQUFBQSxnQkFBZ0IsQ0FBQzdDLElBQWpCLENBQXNCNEMsSUFBSSxDQUFDdkUsRUFBM0I7O0FBQ0EsWUFBSSxNQUFJLENBQUN3QixlQUFMLENBQXFCZ0QsZ0JBQXJCLENBQUosRUFBNEM7QUFDMUNSLFVBQUFBLE1BQU0sQ0FBQ3JDLElBQVAsQ0FBWTRDLElBQUksQ0FBQ3ZFLEVBQWpCO0FBQ0Q7QUFDRixPQU5EO0FBT0Q7O0FBRUQsV0FBT2dFLE1BQVA7QUFDRCxHOztTQXFJRFMsTSxHQUFBLGtCQUFTO0FBQ1AsV0FDRSxLQUFLbEUsS0FBTCxDQUFXOEMsWUFBWCxHQUEwQixLQUFLcUIsVUFBTCxFQUExQixHQUE4QyxLQUFLQyxVQUFMLEVBRGhEO0FBR0QsRzs7O0VBdE55Q3ZGLEtBQUssQ0FBQ3dGLGE7O1NBQTdCakYsYztBQW1PckJBLGNBQWMsQ0FBQ2tGLFlBQWYsR0FBOEI7QUFDNUJqRCxFQUFBQSxRQUFRLEVBQUUsS0FEa0I7QUFFNUJFLEVBQUFBLHNCQUFzQixFQUFFLElBRkk7QUFHNUJuQixFQUFBQSxpQkFBaUIsRUFBRSxXQUhTO0FBSTVCRixFQUFBQSxhQUFhLEVBQUUsSUFKYTtBQUs1Qm9DLEVBQUFBLGlCQUFpQixFQUFFLDZCQUFNLENBQUU7QUFMQyxDQUE5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIHJlYWN0L25vLXVudXNlZC1wcm9wLXR5cGVzICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFNlYXJjaEJhciBmcm9tICdAb3B1c2NhcGl0YS9yZWFjdC1zZWFyY2hiYXInO1xuXG5pbXBvcnQgU3Bpbm5lciBmcm9tICcuLi9zcGlubmVyJztcbmltcG9ydCB7IGRhdGFTb3VyY2VQcm92aWRlclR5cGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy90eXBlcyc7XG5pbXBvcnQgQ29sdW1uTGlzdCBmcm9tICcuLi8uLi9tb2RlbHMvY29sdW1uL2NvbHVtbi1saXN0JztcbmltcG9ydCBWaWV3Q29sdW1uIGZyb20gJy4vY29sdW1uL2NvbHVtbi5jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3VGFiQ29udGVudCBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIGNvbnN0IGlzRGF0YUxvYWRlZCA9IHByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5pc0xvYWRlZDtcbiAgICBjb25zdCBpZE9mRmlyc3RJdGVtID0gdGhpcy5nZXRJZE9mRmlyc3RJdGVtKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc0RhdGFMb2FkZWQsXG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiAwLFxuICAgICAgc2VhcmNoaW5nRm9yOiAnJyxcbiAgICAgIHNlbGVjdGVkQ29sdW1uOiBpZE9mRmlyc3RJdGVtICE9PSBudWxsID8gMSA6IDAsXG4gICAgICBzZWxlY3RlZElkOiBpZE9mRmlyc3RJdGVtLFxuICAgIH07XG5cbiAgICB0aGlzLmNvbHVtbnMgPSBuZXcgQ29sdW1uTGlzdChwcm9wcy5kYXRhU291cmNlUHJvdmlkZXIpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICghdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQpIHtcbiAgICAgIHRoaXMubG9hZERhdGEodGhpcy5wcm9wcyk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7IGlzTG9hZGVkIH0gPSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyO1xuICAgIGNvbnN0IGNoZWNrZWQgPSBuZXh0UHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmlzRGF0YUxvYWRlZCAhPT0gaXNMb2FkZWQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc0RhdGFMb2FkZWQ6IGlzTG9hZGVkLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0xvYWRlZCkge1xuICAgICAgdGhpcy5sb2FkRGF0YShuZXh0UHJvcHMpO1xuICAgIH1cblxuICAgIGlmIChjaGVja2VkKSB7XG4gICAgICBjb25zdCBsYXN0VXBkYXRlZCA9IGNoZWNrZWQuZ2V0TGFzdFVwZGF0ZVN0YW1wKCk7XG4gICAgICBpZiAobGFzdFVwZGF0ZWQgIT09IHRoaXMuc3RhdGUuY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBsYXN0VXBkYXRlZCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0SWRPZkZpcnN0SXRlbSA9IChwcm9wcykgPT4ge1xuICAgIGNvbnN0IHsgZGF0YVNvdXJjZVByb3ZpZGVyIH0gPSBwcm9wcztcbiAgICBjb25zdCBmaXJzdEl0ZW0gPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Rmlyc3RJdGVtKCk7XG4gICAgaWYgKGZpcnN0SXRlbSA9PT0gbnVsbCB8fCAhZmlyc3RJdGVtLmlkKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiBmaXJzdEl0ZW0uaWQ7XG4gIH1cblxuICBnZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKSB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcbiAgICByZXR1cm4gY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRJc0NoZWNrZWRBbGwocGFyZW50SWRzKTtcbiAgfVxuXG4gIGdldENoZWNrZWRJZHMocGFyZW50SWRzLCBkYXRhKSB7XG4gICAgY29uc3QgY2hlY2tlZEl0ZW1IYXNoTGlzdCA9IHRoaXMucHJvcHMuZGF0YVNvdXJjZVByb3ZpZGVyLmdldENoZWNrZWQoKTtcbiAgICBjb25zdCByZXN1bHQgPSBjaGVja2VkSXRlbUhhc2hMaXN0LmdldENoZWNrZWRJdGVtcyhwYXJlbnRJZHMpLm1hcChpID0+IGkuaWQpO1xuXG4gICAgLy8gQWRkcyBhbGwgaXRlbXMgdGhhdCBoYXZlIGNoZWNrZWRBbGwgaW4gY2hpbGRyZW5cbiAgICBpZiAoZGF0YSAmJiBBcnJheS5pc0FycmF5KGRhdGEuaXRlbXMpKSB7XG4gICAgICBkYXRhLml0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudFBhcmVudElkcyA9IHBhcmVudElkcy5zbGljZSgpO1xuICAgICAgICBjdXJyZW50UGFyZW50SWRzLnB1c2goaXRlbS5pZCk7XG4gICAgICAgIGlmICh0aGlzLmdldElzQ2hlY2tlZEFsbChjdXJyZW50UGFyZW50SWRzKSkge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0uaWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZ2V0Q29udGVudCA9ICgpID0+IHtcbiAgICB0aGlzLnJlZnJlc2hDb250ZW50KCk7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuY29sdW1ucy5saXN0IHx8IFtdO1xuICAgIGNvbnN0IHNlbGVjdGVkUGF0aCA9IHRoaXMuY29sdW1ucy5zZWxlY3RlZFBhdGggfHwgW107XG4gICAgY29uc3QgcGFyZW50SWRzID0gW107XG4gICAgbGV0IGFueUNoZWNrZWRBbGwgPSBmYWxzZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItY29udGVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm9jLWhpZXJhcmNoeS1zZWxlY3Rvci10YWItc2VhcmNoLWJhclwiPlxuICAgICAgICAgIDxTZWFyY2hCYXJcbiAgICAgICAgICAgIGRlZmFsdFZhbHVlPXt0aGlzLnN0YXRlLnNlYXJjaGluZ0Zvcn1cbiAgICAgICAgICAgIGlzRHluYW1pY1xuICAgICAgICAgICAgaXNUb29sdGlwRW5hYmxlZD17ISF0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXB9XG4gICAgICAgICAgICBtaW5DaGFycz17Mn1cbiAgICAgICAgICAgIHRyYW5zbGF0aW9ucz17e1xuICAgICAgICAgICAgICB0b29sdGlwOiB0aGlzLnByb3BzLnNlYXJjaFRvb2x0aXAsXG4gICAgICAgICAgICAgIHNlYXJjaFBsYWNlSG9sZGVyOiB0aGlzLnByb3BzLnNlYXJjaFBsYWNlSG9sZGVyLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uU2VhcmNoPXt0aGlzLnNlYXJjaENoYW5nZUhhbmRsZXJ9XG4gICAgICAgICAgICBvbkNsZWFyPXt0aGlzLnNlYXJjaENsZWFySGFuZGxlcn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvYy1oaWVyYXJjaHktc2VsZWN0b3ItY29sdW1uLXdyYXBwZXJcIj5cbiAgICAgICAgICB7IE9iamVjdC5rZXlzKGxpc3QpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gbGlzdFtrZXldO1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRJZCA9IHNlbGVjdGVkUGF0aFtrZXldID8gU3RyaW5nKHNlbGVjdGVkUGF0aFtrZXldKSA6IG51bGw7XG4gICAgICAgICAgICBjb25zdCBwYXJlbnRSZWZlcmVuY2VJZHMgPSBwYXJlbnRJZHMuc2xpY2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGlzQ2hlY2tlZEFsbCA9IHRoaXMuZ2V0SXNDaGVja2VkQWxsKHBhcmVudElkcyk7XG4gICAgICAgICAgICBjb25zdCBjaGVja2VkSWRzID0gaXNDaGVja2VkQWxsID8gW10gOiB0aGlzLmdldENoZWNrZWRJZHMocGFyZW50SWRzLCBkYXRhKTtcblxuICAgICAgICAgICAgYW55Q2hlY2tlZEFsbCA9IGFueUNoZWNrZWRBbGwgfHwgaXNDaGVja2VkQWxsO1xuICAgICAgICAgICAgcGFyZW50SWRzLnB1c2goc2VsZWN0ZWRJZCk7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxWaWV3Q29sdW1uXG4gICAgICAgICAgICAgICAgYWxsTGFiZWw9e3RoaXMucHJvcHMuYWxsTGFiZWx9XG4gICAgICAgICAgICAgICAgY2hlY2tlZEFsbD17YW55Q2hlY2tlZEFsbCB8fCBpc0NoZWNrZWRBbGx9XG4gICAgICAgICAgICAgICAgY2hlY2tlZEFsbERpc2FibGVkPXthbnlDaGVja2VkQWxsICYmICFpc0NoZWNrZWRBbGx9XG4gICAgICAgICAgICAgICAgY2hlY2tlZEFsbEhpZGRlbj17TnVtYmVyKGtleSkgPT09IDB9XG4gICAgICAgICAgICAgICAgY2hlY2tlZElkcz17Y2hlY2tlZElkc31cbiAgICAgICAgICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICAgICAgICAgIGluZGV4PXtOdW1iZXIoa2V5KSArIDF9XG4gICAgICAgICAgICAgICAgaXRlbVJlbmRlckZ1bmN0aW9uPXt0aGlzLnByb3BzLmxpc3RJdGVtUmVuZGVyRnVuY3Rpb259XG4gICAgICAgICAgICAgICAga2V5PXtOdW1iZXIoa2V5KSArIDF9XG4gICAgICAgICAgICAgICAgcmVmZXJlbmNlSWRzPXtwYXJlbnRSZWZlcmVuY2VJZHN9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRJZD17c2VsZWN0ZWRJZH1cbiAgICAgICAgICAgICAgICBvbkNoZWNrPXt0aGlzLmNoZWNrSGFuZGxlcn1cbiAgICAgICAgICAgICAgICBvbkNoZWNrQWxsPXt0aGlzLmNoZWNrQWxsSGFuZGxlcn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmNsaWNrSGFuZGxlcn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSkgfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG5cbiAgZ2V0U3Bpbm5lciA9ICgpID0+IDxkaXYgY2xhc3NOYW1lPVwib2MtaGllcmFyY2h5LXNlbGVjdG9yLXRhYi1jb250ZW50XCI+PFNwaW5uZXIgLz48L2Rpdj47XG5cbiAgY2xpY2tIYW5kbGVyID0gKGxldmVsLCBpZCkgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2VsZWN0ZWRDb2x1bW46IGxldmVsLFxuICAgICAgc2VsZWN0ZWRJZDogaWQsXG4gICAgfSk7XG4gIH1cblxuICBjaGVja0hhbmRsZXIgPSAocmVmZXJlbmNlSWRzLCBpZCwgY2hlY2tTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSB0aGlzLnByb3BzLmRhdGFTb3VyY2VQcm92aWRlci5nZXRDaGVja2VkKCk7XG4gICAgaWYgKGNoZWNrU3RhdGUpIHtcbiAgICAgIGNoZWNrZWRJdGVtSGFzaExpc3QuYWRkKHJlZmVyZW5jZUlkcywgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LnJlbW92ZShyZWZlcmVuY2VJZHMsIGlkKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMub25DaGVja0xpc3RDaGFuZ2UoY2hlY2tlZEl0ZW1IYXNoTGlzdCk7XG4gIH1cblxuICBjaGVja0FsbEhhbmRsZXIgPSAocmVmZXJlbmNlSWRzLCBjaGVja1N0YXRlKSA9PiB7XG4gICAgY29uc3QgcGFyZW50SWRzID0gcmVmZXJlbmNlSWRzLnNsaWNlKCk7XG4gICAgY29uc3QgaWQgPSBwYXJlbnRJZHMucG9wKCk7XG5cbiAgICBpZiAoIWlkKSB0aHJvdyBuZXcgRXJyb3IoJ1RoZXJlIGlzIG5vIHNlbGVjdGVkIHBhcmVudCBlbGVtZW50IHRvIHBlcmZvcm0gY2hlY2tpbmcgb2YgYWxsIGVsZW1lbnRzJyk7XG5cbiAgICBjb25zdCBjaGVja2VkSXRlbUhhc2hMaXN0ID0gdGhpcy5wcm9wcy5kYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuICAgIGlmIChjaGVja1N0YXRlKSB7XG4gICAgICBjaGVja2VkSXRlbUhhc2hMaXN0LmFkZEFsbChwYXJlbnRJZHMsIGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hlY2tlZEl0ZW1IYXNoTGlzdC5yZW1vdmVBbGwocGFyZW50SWRzLCBpZCk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgY2hlY2tlZEl0ZW1zTGFzdFVwZGF0ZTogY2hlY2tlZEl0ZW1IYXNoTGlzdC5nZXRMYXN0VXBkYXRlU3RhbXAoKSxcbiAgICB9KTtcbiAgICB0aGlzLnByb3BzLm9uQ2hlY2tMaXN0Q2hhbmdlKGNoZWNrZWRJdGVtSGFzaExpc3QpO1xuICB9XG5cbiAgc2VhcmNoQ2hhbmdlSGFuZGxlciA9IHNlYXJjaGluZ0ZvciA9PiB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yIH0pO1xuXG4gIHNlYXJjaENsZWFySGFuZGxlciA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHsgc2VhcmNoaW5nRm9yOiAnJyB9KTtcbiAgfVxuXG4gIGxvYWREYXRhID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBkYXRhU291cmNlUHJvdmlkZXIsIG9uQ2hlY2tMaXN0Q2hhbmdlIH0gPSBwcm9wcztcbiAgICBkYXRhU291cmNlUHJvdmlkZXIubG9hZERhdGEoKS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGNoZWNrZWRJdGVtSGFzaExpc3QgPSBkYXRhU291cmNlUHJvdmlkZXIuZ2V0Q2hlY2tlZCgpO1xuICAgICAgY29uc3Qgc3RhdGVPYmplY3QgPSB7XG4gICAgICAgIGlzRGF0YUxvYWRlZDogZGF0YVNvdXJjZVByb3ZpZGVyLmlzTG9hZGVkLFxuICAgICAgICBjaGVja2VkSXRlbXNMYXN0VXBkYXRlOiBjaGVja2VkSXRlbUhhc2hMaXN0LmdldExhc3RVcGRhdGVTdGFtcCgpLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgaWRPZkZpcnN0SXRlbSA9IHRoaXMuZ2V0SWRPZkZpcnN0SXRlbShwcm9wcyk7XG4gICAgICBpZiAoaWRPZkZpcnN0SXRlbSAhPT0gbnVsbCkge1xuICAgICAgICBzdGF0ZU9iamVjdC5zZWxlY3RlZENvbHVtbiA9IDE7XG4gICAgICAgIHN0YXRlT2JqZWN0LnNlbGVjdGVkSWQgPSBpZE9mRmlyc3RJdGVtO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNldFN0YXRlKHN0YXRlT2JqZWN0KTtcblxuICAgICAgb25DaGVja0xpc3RDaGFuZ2UoY2hlY2tlZEl0ZW1IYXNoTGlzdCk7XG4gICAgfSk7XG4gIH1cblxuICByZWZyZXNoQ29udGVudCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdGVkQ29sdW1uLCBzZWxlY3RlZElkLCBzZWFyY2hpbmdGb3IgfSA9IHRoaXMuc3RhdGU7XG4gICAgdGhpcy5jb2x1bW5zLnNldFNlYXJjaGluZ0ZvcihzZWFyY2hpbmdGb3IpO1xuICAgIHRoaXMuY29sdW1ucy5yZWZyZXNoKHNlbGVjdGVkQ29sdW1uLCBzZWxlY3RlZElkKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5zdGF0ZS5pc0RhdGFMb2FkZWQgPyB0aGlzLmdldENvbnRlbnQoKSA6IHRoaXMuZ2V0U3Bpbm5lcigpXG4gICAgKTtcbiAgfVxufVxuXG5WaWV3VGFiQ29udGVudC5wcm9wVHlwZXMgPSB7XG4gIGFsbExhYmVsOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBpbmRleDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICBsaXN0SXRlbVJlbmRlckZ1bmN0aW9uOiBQcm9wVHlwZXMuZnVuYyxcbiAgZGF0YVNvdXJjZVByb3ZpZGVyOiBkYXRhU291cmNlUHJvdmlkZXJUeXBlLmlzUmVxdWlyZWQsXG4gIHNlYXJjaFBsYWNlSG9sZGVyOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuc3RyaW5nLCBQcm9wVHlwZXMuZWxlbWVudF0pLFxuICBzZWFyY2hUb29sdGlwOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtQcm9wVHlwZXMuZWxlbWVudCwgUHJvcFR5cGVzLnN0cmluZ10pLFxuICBvbkNoZWNrTGlzdENoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5WaWV3VGFiQ29udGVudC5kZWZhdWx0UHJvcHMgPSB7XG4gIGFsbExhYmVsOiAnQWxsJyxcbiAgbGlzdEl0ZW1SZW5kZXJGdW5jdGlvbjogbnVsbCxcbiAgc2VhcmNoUGxhY2VIb2xkZXI6ICdTZWFyY2guLi4nLFxuICBzZWFyY2hUb29sdGlwOiBudWxsLFxuICBvbkNoZWNrTGlzdENoYW5nZTogKCkgPT4ge30sXG59O1xuIl19