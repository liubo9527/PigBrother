var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BehaviorTree = (function () {
    function BehaviorTree() {
    }
    return BehaviorTree;
}());
__reflect(BehaviorTree.prototype, "BehaviorTree");
var maxChildNumber = 16;
//并行结束条件
var E_ParallelFinishCondition;
(function (E_ParallelFinishCondition) {
    E_ParallelFinishCondition[E_ParallelFinishCondition["k_PFC_OR"] = 1] = "k_PFC_OR";
    E_ParallelFinishCondition[E_ParallelFinishCondition["k_PFC_AND"] = 2] = "k_PFC_AND";
})(E_ParallelFinishCondition || (E_ParallelFinishCondition = {}));
var BehaviorRunningStatus;
(function (BehaviorRunningStatus) {
    BehaviorRunningStatus[BehaviorRunningStatus["k_BRS_ERROR_Transition"] = -1] = "k_BRS_ERROR_Transition";
    BehaviorRunningStatus[BehaviorRunningStatus["k_BRS_Executing"] = 0] = "k_BRS_Executing";
    BehaviorRunningStatus[BehaviorRunningStatus["k_BRS_Finish"] = 1] = "k_BRS_Finish";
})(BehaviorRunningStatus || (BehaviorRunningStatus = {}));
var E_TerminalNodeStates;
(function (E_TerminalNodeStates) {
    E_TerminalNodeStates[E_TerminalNodeStates["K_TNS_Ready"] = 1] = "K_TNS_Ready";
    E_TerminalNodeStates[E_TerminalNodeStates["K_TNS_Running"] = 2] = "K_TNS_Running";
    E_TerminalNodeStates[E_TerminalNodeStates["K_TNS_Finish"] = 3] = "K_TNS_Finish";
})(E_TerminalNodeStates || (E_TerminalNodeStates = {}));
var BehaviorNode = (function () {
    //constructor
    function BehaviorNode(behaviorParentNode, behaviorPrecondition) {
        if (behaviorPrecondition === void 0) { behaviorPrecondition = null; }
        this._parentBehaviorNode = behaviorParentNode;
        this._behaviorNodePrecondition = behaviorParentNode;
    }
    Object.defineProperty(BehaviorNode.prototype, "behaviorNodePrecondition", {
        get: function () {
            return this._behaviorNodePrecondition;
        },
        //set property
        set: function (behaviorNodePrecondition) {
            this._behaviorNodePrecondition = behaviorNodePrecondition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BehaviorNode.prototype, "debugName", {
        get: function () {
            return this._debugName;
        },
        set: function (debugName) {
            this._debugName = debugName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BehaviorNode.prototype, "lastActiveNode", {
        get: function () {
            return this._lastActiveNode;
        },
        set: function (lastActiveNode) {
            this._lastActiveNode = lastActiveNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BehaviorNode.prototype, "activeNode", {
        get: function () {
            return this._activeNode;
        },
        set: function (activeNode) {
            this._activeNode = activeNode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BehaviorNode.prototype, "parentBehaviorNode", {
        get: function () {
            return this._parentBehaviorNode;
        },
        set: function (parentBehaviorNode) {
            this._parentBehaviorNode = parentBehaviorNode;
        },
        enumerable: true,
        configurable: true
    });
    //评估命令行为 包括先决条件
    BehaviorNode.prototype.evaluate = function (behaviorInputParam) {
        return (this._behaviorNodePrecondition == null
            || this._behaviorNodePrecondition.externalCondition(behaviorInputParam)
                && this._doEvaluate(behaviorInputParam));
    };
    //add childBehaviorNode
    BehaviorNode.prototype.addChilBehaviordNode = function (childBehaviorNode) {
        var findIndx = this._childBehaviorNodeList.indexOf(childBehaviorNode);
        if (findIndx > -1) {
            this._childBehaviorNodeList.push();
        }
        console.log("The number of child nodes is ", this._childBehaviorNodeList.length);
    };
    //执行任务
    BehaviorNode.prototype.tick = function (behaviorInputParam) {
        return this._doTick(behaviorInputParam);
    };
    //转换
    BehaviorNode.prototype.transition = function (behaviorInputParam) {
    };
    BehaviorNode.prototype.checkIndex = function (index) {
        return index >= 0 && index < this._childBehaviorNodeList.length;
    };
    return BehaviorNode;
}());
__reflect(BehaviorNode.prototype, "BehaviorNode");
//前提
var BehaviorNodePrecondition = (function () {
    function BehaviorNodePrecondition() {
    }
    return BehaviorNodePrecondition;
}());
__reflect(BehaviorNodePrecondition.prototype, "BehaviorNodePrecondition");
//逻辑判断
var BehaviorNodePreconditionTRUE = (function (_super) {
    __extends(BehaviorNodePreconditionTRUE, _super);
    function BehaviorNodePreconditionTRUE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BehaviorNodePreconditionTRUE.prototype.externalCondition = function (behaviorInputParam) {
        return true;
    };
    return BehaviorNodePreconditionTRUE;
}(BehaviorNodePrecondition));
__reflect(BehaviorNodePreconditionTRUE.prototype, "BehaviorNodePreconditionTRUE");
var BehaviorNodePreconditionFALSE = (function (_super) {
    __extends(BehaviorNodePreconditionFALSE, _super);
    function BehaviorNodePreconditionFALSE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BehaviorNodePreconditionFALSE.prototype.externalCondition = function (behaviorInputParam) {
        return false;
    };
    return BehaviorNodePreconditionFALSE;
}(BehaviorNodePrecondition));
__reflect(BehaviorNodePreconditionFALSE.prototype, "BehaviorNodePreconditionFALSE");
var BehaviorNodePreconditionNOT = (function (_super) {
    __extends(BehaviorNodePreconditionNOT, _super);
    function BehaviorNodePreconditionNOT(lhs) {
        var _this = _super.call(this) || this;
        _this._lhs = lhs;
        return _this;
    }
    BehaviorNodePreconditionNOT.prototype.externalCondition = function (behaviorInputParam) {
        return !this._lhs.externalCondition(behaviorInputParam);
    };
    return BehaviorNodePreconditionNOT;
}(BehaviorNodePrecondition));
__reflect(BehaviorNodePreconditionNOT.prototype, "BehaviorNodePreconditionNOT");
var behaviorNodePreconditionAND = (function (_super) {
    __extends(behaviorNodePreconditionAND, _super);
    function behaviorNodePreconditionAND(behaviorNodePreconditionOne, behaviorNodePreconditionTwo) {
        var _this = _super.call(this) || this;
        _this._behaviorNodePreconditionOne = behaviorNodePreconditionOne;
        _this._behaviorNodePreconditionTwo = behaviorNodePreconditionTwo;
        return _this;
    }
    behaviorNodePreconditionAND.prototype.externalCondition = function (behaviorInputParam) {
        return this._behaviorNodePreconditionOne.externalCondition(behaviorInputParam)
            && this._behaviorNodePreconditionTwo.externalCondition(behaviorInputParam);
    };
    return behaviorNodePreconditionAND;
}(BehaviorNodePrecondition));
__reflect(behaviorNodePreconditionAND.prototype, "behaviorNodePreconditionAND");
var behaviorNodePreconditionOR = (function (_super) {
    __extends(behaviorNodePreconditionOR, _super);
    function behaviorNodePreconditionOR(behaviorNodePreconditionOne, behaviorNodePreconditionTwo) {
        var _this = _super.call(this) || this;
        _this._behaviorNodePreconditionOne = behaviorNodePreconditionOne;
        _this._behaviorNodePreconditionTwo = behaviorNodePreconditionTwo;
        return _this;
    }
    behaviorNodePreconditionOR.prototype.externalCondition = function (behaviorInputParam) {
        return this._behaviorNodePreconditionOne.externalCondition(behaviorInputParam)
            || this._behaviorNodePreconditionTwo.externalCondition(behaviorInputParam);
    };
    return behaviorNodePreconditionOR;
}(BehaviorNodePrecondition));
__reflect(behaviorNodePreconditionOR.prototype, "behaviorNodePreconditionOR");
var behaviorNodePreconditionXOR = (function (_super) {
    __extends(behaviorNodePreconditionXOR, _super);
    function behaviorNodePreconditionXOR(behaviorNodePreconditionOne, behaviorNodePreconditionTwo) {
        var _this = _super.call(this) || this;
        _this._behaviorNodePreconditionOne = behaviorNodePreconditionOne;
        _this._behaviorNodePreconditionTwo = behaviorNodePreconditionTwo;
        return _this;
    }
    behaviorNodePreconditionXOR.prototype.externalCondition = function (behaviorInputParam) {
        return this._behaviorNodePreconditionOne.externalCondition(behaviorInputParam)
            !== this._behaviorNodePreconditionTwo.externalCondition(behaviorInputParam);
    };
    return behaviorNodePreconditionXOR;
}(BehaviorNodePrecondition));
__reflect(behaviorNodePreconditionXOR.prototype, "behaviorNodePreconditionXOR");
var BehaviorNodePrioritySelector = (function (_super) {
    __extends(BehaviorNodePrioritySelector, _super);
    function BehaviorNodePrioritySelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BehaviorNodePrioritySelector.prototype._doEvaluate = function (behaviorInputParam) {
        this._currentSelectIndex = maxChildNumber;
        for (var i = 0; i < this._childBehaviorNodeList.length; i++) {
            var behaviorNode = this._childBehaviorNodeList[i];
            if (behaviorNode.evaluate(behaviorInputParam)) {
                this._currentSelectIndex = i;
                return true;
            }
        }
        return false;
    };
    BehaviorNodePrioritySelector.prototype._doTransition = function (behaviorInputParam) {
        if (this.checkIndex(this._lastSelectIndex)) {
            this._childBehaviorNodeList[this._lastSelectIndex].transition(behaviorInputParam);
        }
        this._lastSelectIndex = maxChildNumber;
    };
    BehaviorNodePrioritySelector.prototype._doTick = function (behaviorInputParam) {
        var bIsFinished = BehaviorRunningStatus.k_BRS_Finish;
        if (this.checkIndex(this._currentSelectIndex)) {
            if (this._lastSelectIndex != this._currentSelectIndex) {
                if (this.checkIndex(this._lastSelectIndex)) {
                    this._childBehaviorNodeList[this._lastSelectIndex].transition(behaviorInputParam);
                }
                this._lastSelectIndex = this._currentSelectIndex;
            }
        }
        if (this.checkIndex(this._lastSelectIndex)) {
            var behaviorNode = this._childBehaviorNodeList[this._lastSelectIndex];
            bIsFinished = behaviorNode.tick(behaviorInputParam);
            if (bIsFinished) {
                this._lastSelectIndex = maxChildNumber;
            }
        }
        return bIsFinished;
    };
    return BehaviorNodePrioritySelector;
}(BehaviorNode));
__reflect(BehaviorNodePrioritySelector.prototype, "BehaviorNodePrioritySelector");
//没有优先级的选择权
var BehaviorNodeNonePrioritySelector = (function (_super) {
    __extends(BehaviorNodeNonePrioritySelector, _super);
    function BehaviorNodeNonePrioritySelector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BehaviorNodeNonePrioritySelector.prototype._doEvaluate = function (behaviorInputParam) {
        if (this.checkIndex(this._currentSelectIndex)) {
            if (this._childBehaviorNodeList[this._currentSelectIndex].evaluate(behaviorInputParam)) {
                return true;
            }
        }
        return _super.prototype._doEvaluate.call(this, behaviorInputParam); //调用父类的方法
    };
    return BehaviorNodeNonePrioritySelector;
}(BehaviorNodePrioritySelector));
__reflect(BehaviorNodeNonePrioritySelector.prototype, "BehaviorNodeNonePrioritySelector");
//序列
var BehaviorNodeSequence = (function (_super) {
    __extends(BehaviorNodeSequence, _super);
    function BehaviorNodeSequence() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BehaviorNodeSequence.prototype._doEvaluate = function (behaviorInputParam) {
        var index;
        if (this._currentBehaviorNodeIndex == maxChildNumber) {
            index = 0;
        }
        else {
            index = this._currentBehaviorNodeIndex;
        }
        if (this.checkIndex(index)) {
            var behaviorNode = this._childBehaviorNodeList[index];
            if (behaviorNode.evaluate(behaviorInputParam)) {
                return true;
            }
        }
        return false;
    };
    BehaviorNodeSequence.prototype._doTransition = function (behaviorInputParam) {
        if (this.checkIndex(this._currentBehaviorNodeIndex)) {
            var behaviorNode = this._childBehaviorNodeList[this._currentBehaviorNodeIndex];
            behaviorNode.transition(behaviorNode);
        }
        this._currentBehaviorNodeIndex = maxChildNumber;
    };
    BehaviorNodeSequence.prototype._doTick = function (behaviorInputParam) {
        var bIsFinished = BehaviorRunningStatus.k_BRS_Finish;
        if (this._currentBehaviorNodeIndex == maxChildNumber) {
            this._currentBehaviorNodeIndex = 0;
        }
        var behaviorNode = this._childBehaviorNodeList[this._currentBehaviorNodeIndex];
        bIsFinished = behaviorNode.tick(behaviorInputParam);
        if (bIsFinished == BehaviorRunningStatus.k_BRS_Finish) {
            ++this._currentBehaviorNodeIndex;
            if (this._currentBehaviorNodeIndex == this._childBehaviorNodeList.length) {
                this._currentBehaviorNodeIndex = maxChildNumber;
            }
            else {
                bIsFinished = BehaviorRunningStatus.k_BRS_Executing;
            }
        }
        if (bIsFinished == BehaviorRunningStatus.k_BRS_ERROR_Transition) {
            this._currentBehaviorNodeIndex = maxChildNumber;
        }
        return bIsFinished;
    };
    return BehaviorNodeSequence;
}(BehaviorNode));
__reflect(BehaviorNodeSequence.prototype, "BehaviorNodeSequence");
//控制节点
/**
 * BehaviorTerminalNode !!
 */
var BehaviorTerminalNode = (function (_super) {
    __extends(BehaviorTerminalNode, _super);
    function BehaviorTerminalNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BehaviorTerminalNode.prototype._doTransition = function (behaviorInputParam) {
        if (this._needExit) {
            this._doExit(behaviorInputParam, BehaviorRunningStatus.k_BRS_ERROR_Transition);
        }
        this.activeNode = null;
        this._states = E_TerminalNodeStates.K_TNS_Ready;
    };
    BehaviorTerminalNode.prototype._doEvaluate = function (behaviorInputParam) {
        return false;
    };
    BehaviorTerminalNode.prototype._doTick = function (behaviorInputParam) {
        var bIsFinish = BehaviorRunningStatus.k_BRS_Finish;
        switch (this._states) {
            case E_TerminalNodeStates.K_TNS_Ready: {
                this._doEnter(behaviorInputParam);
                this._needExit = true;
                this._states = E_TerminalNodeStates.K_TNS_Running;
                this.activeNode = this;
                break;
            }
            case E_TerminalNodeStates.K_TNS_Running: {
                var bIsFinish = this._doExecute(behaviorInputParam);
                this.activeNode = this;
                if (bIsFinish == BehaviorRunningStatus.k_BRS_Finish || bIsFinish < 0) {
                    this._states = E_TerminalNodeStates.K_TNS_Finish;
                }
                break;
            }
            case E_TerminalNodeStates.K_TNS_Finish: {
                if (this._needExit) {
                    this._doExit(behaviorInputParam, bIsFinish);
                }
                this._states = E_TerminalNodeStates.K_TNS_Ready;
                this._needExit = false;
                this.activeNode = null;
                break;
            }
            default: {
                console.log("terminal states error");
                break;
            }
        }
        return bIsFinish;
    };
    return BehaviorTerminalNode;
}(BehaviorNode));
__reflect(BehaviorTerminalNode.prototype, "BehaviorTerminalNode");
//并行节点
var BehaviorParallelNode = (function (_super) {
    __extends(BehaviorParallelNode, _super);
    function BehaviorParallelNode(behaviorParentNode, behaviorNodePrecondition) {
        if (behaviorNodePrecondition === void 0) { behaviorNodePrecondition = null; }
        var _this = _super.call(this, behaviorParentNode, behaviorNodePrecondition) || this;
        _this._childNodeStatesList = [];
        for (var i = 0; i < maxChildNumber; i++) {
            _this._childNodeStatesList.push(BehaviorRunningStatus.k_BRS_Executing);
        }
        return _this;
    }
    BehaviorParallelNode.prototype._doEvaluate = function (behaviorInputParam) {
        this._childBehaviorNodeList.forEach(function (element) {
            if (!element.evaluate(behaviorInputParam)) {
                return false;
            }
        });
        return false;
    };
    BehaviorParallelNode.prototype.setFinishCondition = function (finishCondition) {
        this._finishCondition = finishCondition;
    };
    BehaviorParallelNode.prototype._doTransition = function (behaviorInputParam) {
        this._childNodeStatesList.forEach(function (element) {
            element = BehaviorRunningStatus.k_BRS_Executing;
        });
        this._childBehaviorNodeList.forEach(function (element) {
            element.transition(behaviorInputParam);
        });
    };
    BehaviorParallelNode.prototype._doTick = function (behaviorInputParam) {
        var _this = this;
        var finishedChildCount = 0;
        var i = 0;
        this._childBehaviorNodeList.forEach(function (element) {
            var behaviorNode = element;
            if (_this._finishCondition == E_ParallelFinishCondition.k_PFC_OR) {
                if (_this._childNodeStatesList[i] == BehaviorRunningStatus.k_BRS_Executing) {
                    _this._childNodeStatesList[i] = behaviorNode.tick(behaviorInputParam);
                }
                if (_this._childNodeStatesList[i] != BehaviorRunningStatus.k_BRS_Executing) {
                    _this._childNodeStatesList.forEach(function (element) {
                        element = BehaviorRunningStatus.k_BRS_Executing;
                    });
                    return BehaviorRunningStatus.k_BRS_Finish;
                }
            }
            else if (_this._finishCondition == E_ParallelFinishCondition.k_PFC_AND) {
                if (_this._childNodeStatesList[i] == BehaviorRunningStatus.k_BRS_Executing) {
                    _this._childNodeStatesList[i] = behaviorNode.tick(behaviorInputParam);
                }
                if (_this._childNodeStatesList[i] != BehaviorRunningStatus.k_BRS_Executing) {
                    finishedChildCount++;
                }
            }
            i++;
        });
        if (finishedChildCount == this._childBehaviorNodeList.length) {
            this._childNodeStatesList.forEach(function (element) {
                element = BehaviorRunningStatus.k_BRS_Executing;
            });
            return BehaviorRunningStatus.k_BRS_Finish;
        }
        return BehaviorRunningStatus.k_BRS_Executing;
    };
    return BehaviorParallelNode;
}(BehaviorNode));
__reflect(BehaviorParallelNode.prototype, "BehaviorParallelNode");
var LoopConst;
(function (LoopConst) {
    LoopConst.kFiniteLoop = -1;
})(LoopConst || (LoopConst = {}));
var BehaviorLoopNode = (function (_super) {
    __extends(BehaviorLoopNode, _super);
    function BehaviorLoopNode(behaviorParentNode, behaviorNodePrecondition, loopCount) {
        if (behaviorNodePrecondition === void 0) { behaviorNodePrecondition = null; }
        if (loopCount === void 0) { loopCount = LoopConst.kFiniteLoop; }
        var _this = _super.call(this, behaviorParentNode, behaviorNodePrecondition) || this;
        _this._loopCount = LoopConst.kFiniteLoop;
        _this._currentCount = 0;
        _this._loopCount = loopCount;
        return _this;
    }
    BehaviorLoopNode.prototype._doEvaluate = function (behaviorInputParam) {
        var cheackFlg = (this._loopCount == LoopConst.kFiniteLoop) || (this._currentCount < this._loopCount);
        if (!cheackFlg) {
            return false;
        }
        if (this.checkIndex(0)) {
            if (this._childBehaviorNodeList[0].evaluate(behaviorInputParam)) {
                return true;
            }
        }
        return false;
    };
    BehaviorLoopNode.prototype._doTransition = function (behaviorInputParam) {
        if (this.checkIndex(0)) {
            this._childBehaviorNodeList[0].transition(behaviorInputParam);
        }
        this._currentCount = 0;
    };
    BehaviorLoopNode.prototype._doTick = function (behaviorInputParam) {
        var bIsFinish = BehaviorRunningStatus.k_BRS_Finish;
        if (this.checkIndex(0)) {
            var behaviorNode = this._childBehaviorNodeList[0];
            bIsFinish = behaviorNode.tick(behaviorInputParam);
            if (bIsFinish == BehaviorRunningStatus.k_BRS_Finish) {
                if (this._loopCount == LoopConst.kFiniteLoop) {
                    this._currentCount++;
                    if (this._currentCount == this._loopCount) {
                        bIsFinish = BehaviorRunningStatus.k_BRS_Executing;
                    }
                }
                else {
                    bIsFinish = BehaviorRunningStatus.k_BRS_Executing;
                }
            }
        }
        if (bIsFinish) {
            this._currentCount = 0;
        }
        return bIsFinish;
    };
    return BehaviorLoopNode;
}(BehaviorNode));
__reflect(BehaviorLoopNode.prototype, "BehaviorLoopNode");
var BehaviorNodeFactory = (function () {
    function BehaviorNodeFactory() {
    }
    //工厂模式 创建并行node
    BehaviorNodeFactory.createParallelBehaviorNode = function (parentBehaviorNode, parallelFinishCondition, debugName) {
        var parallelBehaviorNode = new BehaviorParallelNode(parentBehaviorNode);
        parallelBehaviorNode.setFinishCondition(parallelFinishCondition);
        this.behaviorNodeCommonSet(parallelBehaviorNode, parentBehaviorNode, debugName);
        return parallelBehaviorNode;
    };
    BehaviorNodeFactory.cratePriorityBehaviorNode = function (parentBehaviorNode, debugName) {
        var priorityBehaviorNode = new BehaviorNodePrioritySelector(parent);
        this.behaviorNodeCommonSet(priorityBehaviorNode, parentBehaviorNode, debugName);
    };
    BehaviorNodeFactory.behaviorNodeCommonSet = function (behaviorNode, parentBehaviorNode, debugName) {
        if (parentBehaviorNode != null) {
            parentBehaviorNode.addChilBehaviordNode(behaviorNode);
            behaviorNode.debugName = debugName;
        }
    };
    return BehaviorNodeFactory;
}());
__reflect(BehaviorNodeFactory.prototype, "BehaviorNodeFactory");
//# sourceMappingURL=BehaviorTree.js.map