import { AnimationStateStyles, AnimationTransitionFactory } from './animation_transition_factory';
/**
 * @experimental Animation support is experimental.
 */
export function buildTrigger(name, ast) {
    return new AnimationTrigger(name, ast);
}
/**
* @experimental Animation support is experimental.
*/
var /**
* @experimental Animation support is experimental.
*/
AnimationTrigger = /** @class */ (function () {
    function AnimationTrigger(name, ast) {
        var _this = this;
        this.name = name;
        this.ast = ast;
        this.transitionFactories = [];
        this.states = {};
        ast.states.forEach(function (ast) {
            var defaultParams = (ast.options && ast.options.params) || {};
            _this.states[ast.name] = new AnimationStateStyles(ast.style, defaultParams);
        });
        balanceProperties(this.states, 'true', '1');
        balanceProperties(this.states, 'false', '0');
        ast.transitions.forEach(function (ast) {
            _this.transitionFactories.push(new AnimationTransitionFactory(name, ast, _this.states));
        });
        this.fallbackTransition = createFallbackTransition(name, this.states);
    }
    Object.defineProperty(AnimationTrigger.prototype, "containsQueries", {
        get: function () { return this.ast.queryCount > 0; },
        enumerable: true,
        configurable: true
    });
    AnimationTrigger.prototype.matchTransition = function (currentState, nextState, element, params) {
        var entry = this.transitionFactories.find(function (f) { return f.match(currentState, nextState, element, params); });
        return entry || null;
    };
    AnimationTrigger.prototype.matchStyles = function (currentState, params, errors) {
        return this.fallbackTransition.buildStyles(currentState, params, errors);
    };
    return AnimationTrigger;
}());
/**
* @experimental Animation support is experimental.
*/
export { AnimationTrigger };
function createFallbackTransition(triggerName, states) {
    var matchers = [function (fromState, toState) { return true; }];
    var animation = { type: 2 /* Sequence */, steps: [], options: null };
    var transition = {
        type: 1 /* Transition */,
        animation: animation,
        matchers: matchers,
        options: null,
        queryCount: 0,
        depCount: 0
    };
    return new AnimationTransitionFactory(triggerName, transition, states);
}
function balanceProperties(obj, key1, key2) {
    if (obj.hasOwnProperty(key1)) {
        if (!obj.hasOwnProperty(key2)) {
            obj[key2] = obj[key1];
        }
    }
    else if (obj.hasOwnProperty(key2)) {
        obj[key1] = obj[key2];
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3RyaWdnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmltYXRpb25zL2Jyb3dzZXIvc3JjL2RzbC9hbmltYXRpb25fdHJpZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQSxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsMEJBQTBCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztBQU9oRyxNQUFNLHVCQUF1QixJQUFZLEVBQUUsR0FBZTtJQUN4RCxPQUFPLElBQUksZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ3hDOzs7O0FBS0Q7OztBQUFBO0lBS0UsMEJBQW1CLElBQVksRUFBUyxHQUFlO1FBQXZELGlCQWNDO1FBZGtCLFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFZO21DQUpJLEVBQUU7c0JBRUEsRUFBRTtRQUc3RCxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDcEIsSUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hFLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksb0JBQW9CLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztTQUM1RSxDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM1QyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU3QyxHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7WUFDekIsS0FBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLDBCQUEwQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDdkYsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGtCQUFrQixHQUFHLHdCQUF3QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDdkU7SUFFRCxzQkFBSSw2Q0FBZTthQUFuQixjQUF3QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFOzs7T0FBQTtJQUV6RCwwQ0FBZSxHQUFmLFVBQWdCLFlBQWlCLEVBQUUsU0FBYyxFQUFFLE9BQVksRUFBRSxNQUE0QjtRQUUzRixJQUFNLEtBQUssR0FDUCxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBakQsQ0FBaUQsQ0FBQyxDQUFDO1FBQzFGLE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQztLQUN0QjtJQUVELHNDQUFXLEdBQVgsVUFBWSxZQUFpQixFQUFFLE1BQTRCLEVBQUUsTUFBYTtRQUN4RSxPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztLQUMxRTsyQkExREg7SUEyREMsQ0FBQTs7OztBQWpDRCw0QkFpQ0M7QUFFRCxrQ0FDSSxXQUFtQixFQUNuQixNQUFtRDtJQUNyRCxJQUFNLFFBQVEsR0FBRyxDQUFDLFVBQUMsU0FBYyxFQUFFLE9BQVksSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLENBQUMsQ0FBQztJQUMxRCxJQUFNLFNBQVMsR0FBZ0IsRUFBQyxJQUFJLGtCQUFnQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBQyxDQUFDO0lBQ2hHLElBQU0sVUFBVSxHQUFrQjtRQUNoQyxJQUFJLG9CQUFrQztRQUN0QyxTQUFTLFdBQUE7UUFDVCxRQUFRLFVBQUE7UUFDUixPQUFPLEVBQUUsSUFBSTtRQUNiLFVBQVUsRUFBRSxDQUFDO1FBQ2IsUUFBUSxFQUFFLENBQUM7S0FDWixDQUFDO0lBQ0YsT0FBTyxJQUFJLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDeEU7QUFFRCwyQkFBMkIsR0FBeUIsRUFBRSxJQUFZLEVBQUUsSUFBWTtJQUM5RSxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN2QjtLQUNGO1NBQU0sSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ25DLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdkI7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0aW9uTWV0YWRhdGFUeXBlLCDJtVN0eWxlRGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7Y29weVN0eWxlcywgaW50ZXJwb2xhdGVQYXJhbXN9IGZyb20gJy4uL3V0aWwnO1xuXG5pbXBvcnQge1NlcXVlbmNlQXN0LCBTdHlsZUFzdCwgVHJhbnNpdGlvbkFzdCwgVHJpZ2dlckFzdH0gZnJvbSAnLi9hbmltYXRpb25fYXN0JztcbmltcG9ydCB7QW5pbWF0aW9uU3RhdGVTdHlsZXMsIEFuaW1hdGlvblRyYW5zaXRpb25GYWN0b3J5fSBmcm9tICcuL2FuaW1hdGlvbl90cmFuc2l0aW9uX2ZhY3RvcnknO1xuXG5cblxuLyoqXG4gKiBAZXhwZXJpbWVudGFsIEFuaW1hdGlvbiBzdXBwb3J0IGlzIGV4cGVyaW1lbnRhbC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVHJpZ2dlcihuYW1lOiBzdHJpbmcsIGFzdDogVHJpZ2dlckFzdCk6IEFuaW1hdGlvblRyaWdnZXIge1xuICByZXR1cm4gbmV3IEFuaW1hdGlvblRyaWdnZXIobmFtZSwgYXN0KTtcbn1cblxuLyoqXG4qIEBleHBlcmltZW50YWwgQW5pbWF0aW9uIHN1cHBvcnQgaXMgZXhwZXJpbWVudGFsLlxuKi9cbmV4cG9ydCBjbGFzcyBBbmltYXRpb25UcmlnZ2VyIHtcbiAgcHVibGljIHRyYW5zaXRpb25GYWN0b3JpZXM6IEFuaW1hdGlvblRyYW5zaXRpb25GYWN0b3J5W10gPSBbXTtcbiAgcHVibGljIGZhbGxiYWNrVHJhbnNpdGlvbjogQW5pbWF0aW9uVHJhbnNpdGlvbkZhY3Rvcnk7XG4gIHB1YmxpYyBzdGF0ZXM6IHtbc3RhdGVOYW1lOiBzdHJpbmddOiBBbmltYXRpb25TdGF0ZVN0eWxlc30gPSB7fTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCBwdWJsaWMgYXN0OiBUcmlnZ2VyQXN0KSB7XG4gICAgYXN0LnN0YXRlcy5mb3JFYWNoKGFzdCA9PiB7XG4gICAgICBjb25zdCBkZWZhdWx0UGFyYW1zID0gKGFzdC5vcHRpb25zICYmIGFzdC5vcHRpb25zLnBhcmFtcykgfHwge307XG4gICAgICB0aGlzLnN0YXRlc1thc3QubmFtZV0gPSBuZXcgQW5pbWF0aW9uU3RhdGVTdHlsZXMoYXN0LnN0eWxlLCBkZWZhdWx0UGFyYW1zKTtcbiAgICB9KTtcblxuICAgIGJhbGFuY2VQcm9wZXJ0aWVzKHRoaXMuc3RhdGVzLCAndHJ1ZScsICcxJyk7XG4gICAgYmFsYW5jZVByb3BlcnRpZXModGhpcy5zdGF0ZXMsICdmYWxzZScsICcwJyk7XG5cbiAgICBhc3QudHJhbnNpdGlvbnMuZm9yRWFjaChhc3QgPT4ge1xuICAgICAgdGhpcy50cmFuc2l0aW9uRmFjdG9yaWVzLnB1c2gobmV3IEFuaW1hdGlvblRyYW5zaXRpb25GYWN0b3J5KG5hbWUsIGFzdCwgdGhpcy5zdGF0ZXMpKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZmFsbGJhY2tUcmFuc2l0aW9uID0gY3JlYXRlRmFsbGJhY2tUcmFuc2l0aW9uKG5hbWUsIHRoaXMuc3RhdGVzKTtcbiAgfVxuXG4gIGdldCBjb250YWluc1F1ZXJpZXMoKSB7IHJldHVybiB0aGlzLmFzdC5xdWVyeUNvdW50ID4gMDsgfVxuXG4gIG1hdGNoVHJhbnNpdGlvbihjdXJyZW50U3RhdGU6IGFueSwgbmV4dFN0YXRlOiBhbnksIGVsZW1lbnQ6IGFueSwgcGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSk6XG4gICAgICBBbmltYXRpb25UcmFuc2l0aW9uRmFjdG9yeXxudWxsIHtcbiAgICBjb25zdCBlbnRyeSA9XG4gICAgICAgIHRoaXMudHJhbnNpdGlvbkZhY3Rvcmllcy5maW5kKGYgPT4gZi5tYXRjaChjdXJyZW50U3RhdGUsIG5leHRTdGF0ZSwgZWxlbWVudCwgcGFyYW1zKSk7XG4gICAgcmV0dXJuIGVudHJ5IHx8IG51bGw7XG4gIH1cblxuICBtYXRjaFN0eWxlcyhjdXJyZW50U3RhdGU6IGFueSwgcGFyYW1zOiB7W2tleTogc3RyaW5nXTogYW55fSwgZXJyb3JzOiBhbnlbXSk6IMm1U3R5bGVEYXRhIHtcbiAgICByZXR1cm4gdGhpcy5mYWxsYmFja1RyYW5zaXRpb24uYnVpbGRTdHlsZXMoY3VycmVudFN0YXRlLCBwYXJhbXMsIGVycm9ycyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRmFsbGJhY2tUcmFuc2l0aW9uKFxuICAgIHRyaWdnZXJOYW1lOiBzdHJpbmcsXG4gICAgc3RhdGVzOiB7W3N0YXRlTmFtZTogc3RyaW5nXTogQW5pbWF0aW9uU3RhdGVTdHlsZXN9KTogQW5pbWF0aW9uVHJhbnNpdGlvbkZhY3Rvcnkge1xuICBjb25zdCBtYXRjaGVycyA9IFsoZnJvbVN0YXRlOiBhbnksIHRvU3RhdGU6IGFueSkgPT4gdHJ1ZV07XG4gIGNvbnN0IGFuaW1hdGlvbjogU2VxdWVuY2VBc3QgPSB7dHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlNlcXVlbmNlLCBzdGVwczogW10sIG9wdGlvbnM6IG51bGx9O1xuICBjb25zdCB0cmFuc2l0aW9uOiBUcmFuc2l0aW9uQXN0ID0ge1xuICAgIHR5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5UcmFuc2l0aW9uLFxuICAgIGFuaW1hdGlvbixcbiAgICBtYXRjaGVycyxcbiAgICBvcHRpb25zOiBudWxsLFxuICAgIHF1ZXJ5Q291bnQ6IDAsXG4gICAgZGVwQ291bnQ6IDBcbiAgfTtcbiAgcmV0dXJuIG5ldyBBbmltYXRpb25UcmFuc2l0aW9uRmFjdG9yeSh0cmlnZ2VyTmFtZSwgdHJhbnNpdGlvbiwgc3RhdGVzKTtcbn1cblxuZnVuY3Rpb24gYmFsYW5jZVByb3BlcnRpZXMob2JqOiB7W2tleTogc3RyaW5nXTogYW55fSwga2V5MTogc3RyaW5nLCBrZXkyOiBzdHJpbmcpIHtcbiAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkxKSkge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleTIpKSB7XG4gICAgICBvYmpba2V5Ml0gPSBvYmpba2V5MV07XG4gICAgfVxuICB9IGVsc2UgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkyKSkge1xuICAgIG9ialtrZXkxXSA9IG9ialtrZXkyXTtcbiAgfVxufVxuIl19