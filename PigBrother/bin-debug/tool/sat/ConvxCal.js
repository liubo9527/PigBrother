var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by gu on 2015/10/12.
 */
/*
    凹多边形计算
*/
var SAT;
(function (SAT) {
    var POLYDIR;
    (function (POLYDIR) {
        POLYDIR[POLYDIR["CLOCKWISE"] = -1] = "CLOCKWISE";
        POLYDIR[POLYDIR["INALINE"] = 0] = "INALINE";
        POLYDIR[POLYDIR["ANTICLOCKWISE"] = 1] = "ANTICLOCKWISE";
    })(POLYDIR || (POLYDIR = {}));
    ;
    var IntersectionStruct = (function () {
        function IntersectionStruct() {
            this.intersectionindex = -1;
            this.intersectionpoint = new egret.Point(0, 0);
        }
        return IntersectionStruct;
    }());
    __reflect(IntersectionStruct.prototype, "IntersectionStruct");
    //是否为凹多边形
    function isConcavePoly(p) {
        if (p.length <= 3)
            return false;
        return getNextConcaveIndex(p, 0) >= 0;
    }
    SAT.isConcavePoly = isConcavePoly;
    //对外接口 分割凹多边形
    function onSeparateConcavePoly(p) {
        var szlist = [];
        //默认为逆时针,否则"反转多边形"
        if (!isAntiClockDir(p)) {
            conversPoly(p);
        }
        _separateConcavePoly(p, szlist, 0);
        return szlist;
    }
    SAT.onSeparateConcavePoly = onSeparateConcavePoly;
    //获取下一个凹点
    function getNextConcaveIndex(p, starindex) {
        if (starindex === void 0) { starindex = 0; }
        if (p.length <= 3)
            return -1;
        var curdir = 0;
        var nextpos = 0;
        var nmax = p.length + starindex;
        for (var i = starindex; i < nmax; i++) {
            curdir = getMutiPtClockDir(p[(i + p.length) % p.length], p[(i - 1 + p.length) % p.length], p[(i + 1 + p.length) % p.length]);
            if (curdir == POLYDIR.ANTICLOCKWISE)
                return i % p.length;
        }
        return -1;
    }
    SAT.getNextConcaveIndex = getNextConcaveIndex;
    //获取所有凹点列表
    function getAllConcaveIndex(p, starindex) {
        if (starindex === void 0) { starindex = 0; }
        if (p.length <= 3)
            return [];
        var szlist = [];
        var curdir = 0;
        var nextpos = 0;
        var nmax = p.length + starindex;
        for (var i = starindex; i < nmax; i++) {
            curdir = getMutiPtClockDir(p[(i + p.length) % p.length], p[(i - 1 + p.length) % p.length], p[(i + 1 + p.length) % p.length]);
            if (curdir == POLYDIR.ANTICLOCKWISE) {
                szlist.push(i % p.length);
            }
        }
        return szlist;
    }
    SAT.getAllConcaveIndex = getAllConcaveIndex;
    //分割多边形
    function _separateConcavePoly(p, szlist, startindex) {
        if (p.length <= 3) {
            szlist.push(p);
            return;
        }
        var nextconcaveindex = getNextConcaveIndex(p, startindex);
        startindex = nextconcaveindex + 1;
        if (nextconcaveindex < 0) {
            szlist.push(p);
            return;
        }
        var intersectionst = new IntersectionStruct;
        if (getSplitPointByRgnBCInter(p, nextconcaveindex, intersectionst)) {
            var szleft = [];
            var szright = [];
            splitPolyByIntersection(p, nextconcaveindex, intersectionst, szleft, szright);
            _separateConcavePoly(szleft, szlist, startindex);
            _separateConcavePoly(szright, szlist, startindex);
            return;
        }
        szlist.push(p);
    }
    /*
    根据分割点分割
     */
    function splitPolyByIntersection(p, concaveindex, intersectionst, szleft, szright) {
        if (concaveindex < 0 || concaveindex >= p.length)
            return false;
        if (intersectionst.intersectionindex < 0 || intersectionst.intersectionindex >= p.length)
            return false;
        var i = 0;
        //左边矩形
        if (concaveindex <= intersectionst.intersectionindex + 1) {
            for (i = intersectionst.intersectionindex; i <= concaveindex + p.length; i++) {
                var pn1 = p[i % p.length];
                szleft.push(pn1);
            }
        }
        else {
            for (i = intersectionst.intersectionindex; i <= concaveindex; i++) {
                var pn2 = p[i];
                szleft.push(pn2);
            }
        }
        //右边矩形
        if (concaveindex <= intersectionst.intersectionindex) {
            for (i = concaveindex; i <= intersectionst.intersectionindex; i++) {
                var pn3 = p[i];
                szright.push(pn3);
            }
        }
        else {
            for (i = concaveindex; i <= intersectionst.intersectionindex + p.length; i++) {
                var pn4 = p[i % p.length];
                szright.push(pn4);
            }
        }
        if (p[intersectionst.intersectionindex].x != intersectionst.intersectionpoint.x && p[intersectionst.intersectionindex].y != intersectionst.intersectionpoint.y) {
            szleft.push(intersectionst.intersectionpoint);
            szright.push(intersectionst.intersectionpoint);
        }
        return true;
    }
    /*
     基于顶点区域划分
     concaveindex:凹点索引
     intersectionindex:·ָ分割点索引
     intersectionpoint:·ָ分割点坐标
     */
    function getSplitPointByRgnBCInter(p, concaveindex, intersectionst) {
        if (p.length <= 3)
            return false;
        var preindex, nextindex;
        preindex = concaveindex > 0 ? concaveindex - 1 : p.length - 1;
        nextindex = concaveindex < p.length - 1 ? concaveindex + 1 : 0;
        var ret1 = 0;
        var ret2 = 0;
        //分区计算
        var A = [];
        var B = [];
        var C = [];
        var D = [];
        //可见点区域
        var A1 = [];
        var B1 = [];
        var C1 = [];
        var D1 = [];
        var nmax = 0;
        nmax = (nextindex <= preindex) ? preindex : preindex + p.length;
        var ncur = 0;
        for (var i = nextindex; i <= nmax; i++) {
            ncur = i % p.length;
            ret1 = getMutiPtClockDir(p[concaveindex], p[preindex], p[ncur]);
            ret2 = getMutiPtClockDir(p[concaveindex], p[nextindex], p[ncur]);
            //计算所在区域
            if (ret1 < 0 && ret2 > 0) {
                A.push(ncur);
            }
            else if (ret1 >= 0 && ret2 >= 0) {
                B.push(ncur);
            }
            else if (ret1 <= 0 && ret2 < 0) {
                C.push(ncur);
            }
            else if (ret1 > 0 && ret2 < 0) {
                D.push(ncur);
            }
        }
        //取可见点分区
        visibleRegionPtSet(p, concaveindex, A, A1);
        B1 = B.concat();
        D1 = D.concat();
        visibleRegionPtSet(p, concaveindex, C, C1);
        if (A1.length > 0) {
            var setA = [];
            var setB = [];
            setSplitByRegion(p, A1, setA, setB);
            if (setB.length > 0) {
                intersectionst.intersectionindex = getBestIntersectionPt(p, concaveindex, setB);
            }
            else {
                intersectionst.intersectionindex = getBestIntersectionPt(p, concaveindex, setA);
            }
            if (intersectionst.intersectionindex < 0 || intersectionst.intersectionindex >= p.length) {
                return false;
            }
            intersectionst.intersectionpoint = p[intersectionst.intersectionindex];
            return true;
        }
        //如果A为空，BC必不为空
        if (B1.length < 1 || C1.length < 1) {
            console.warn("BC分区为空错误");
            return false;
        }
        var mid = 0;
        var left = 0;
        var right = 0;
        mid = concaveindex;
        left = B1[B1.length - 1];
        right = C1[0];
        //BC区域的首位点必在一条直线上
        var d1 = new egret.Point(p[right].x - p[left].x, p[right].y - p[left].y);
        var d00 = new egret.Point(p[concaveindex].x - p[preindex].x, p[concaveindex].y - p[preindex].y);
        var d01 = new egret.Point(p[concaveindex].x - p[nextindex].x, p[concaveindex].y - p[nextindex].y);
        //A区域与交点区域的角平分线
        var d0 = new egret.Point((d00.x + d01.x) / 2, (d00.y + d01.y) / 2);
        var crosspt = new egret.Point(0, 0);
        if (getCrossByRadialAndSegment(p[concaveindex], d0, p[left], d1, crosspt) != 1)
            return false;
        intersectionst.intersectionindex = left;
        intersectionst.intersectionpoint = crosspt;
        return true;
    }
    //获取三点的方向
    function getMutiPtClockDir(op, sp, ep) {
        var ret = (op.x - sp.x) * (ep.y - op.y) - (ep.x - op.x) * (op.y - sp.y);
        return ret > 0 ? POLYDIR.ANTICLOCKWISE : (ret < 0 ? POLYDIR.CLOCKWISE : POLYDIR.INALINE);
    }
    //获取多边形某一点的方向
    function getMutiPtClockDirByIndex(p, index) {
        if (p.length <= 2)
            return POLYDIR.INALINE;
        return getMutiPtClockDir(p[index % p.length], p[(index + p.length - 1) % p.length], p[(index + 1) % p.length]);
    }
    //是否为逆时针
    function isAntiClockDir(p) {
        if (p.length <= 2)
            return true;
        var n = 0;
        var count = 0;
        var nextindex = 0;
        var nextindex2 = 0;
        for (var i = 1; i < p.length; i++) {
            nextindex = (i + 1) % p.length;
            nextindex2 = (i + 2) % p.length;
            n = (p[nextindex].x - p[i].x) * (p[nextindex2].y - p[nextindex].y);
            n -= (p[nextindex].y - p[i].y) * (p[nextindex2].x - p[nextindex].x);
            if (n < 0)
                count--;
            else if (n > 0)
                count++;
        }
        return count <= 0;
    }
    //逆序重排
    function conversPoly(p) {
        var count = p.length;
        var i = -1;
        while (++i < count / 2) {
            var pn1, pn2;
            pn1 = p[i];
            pn2 = p[count - i - 1];
            p[i] = pn2;
            p[count - i - 1] = pn1;
        }
    }
    //是否交叉
    function isVectorInsection(p0, d0, p1, d1) {
        //segments P0+s*D0 for s  in [0,1] ,P1+t*D1 for t in [0,1]
        var e = new egret.Point(p1.x - p0.x, p1.y - p0.y);
        var kross = d0.x * d1.y - d0.y * d1.x;
        var sqrKross = kross * kross;
        var sqrLen0 = d0.x * d0.x + d0.y * d0.y;
        var sqrLen1 = d1.x * d1.x + d1.y * d1.y;
        var sqrEpsilon = 0.01;
        if (sqrKross > sqrEpsilon * sqrLen0 * sqrLen1) {
            //lines of the segments are not parallel
            var s = (e.x * d1.y - e.y * d1.x) / kross;
            if (s < 0 || s > 1) {
                //intersection of lines is not a point on segment P0 + s * D0
                return 0;
            }
            var t = (e.x * d0.y - e.y * d0.x) / kross;
            if (t < 0 || t > 1) {
                //intersection of lines is not a point on segment P1 + t * D1
                return 0;
            }
            return 1;
        }
        return 0;
    }
    function isVisiblePtToConcave(p, index1, index2) {
        var nextindex = 0;
        for (var i = 0; i < p.length; i++) {
            nextindex = (i >= p.length - 1) ? 0 : i + 1;
            if (i == index1 || i == index2 || nextindex == index1 || nextindex == index2)
                continue;
            if (isVectorInsection(p[index1], p[index2], p[i], p[nextindex]))
                return false;
        }
        return true;
    }
    function visibleRegionPtSet(p, concaveindex, region, region1) {
        var i = -1;
        while (++i < region.length) {
            if (isVisiblePtToConcave(p, concaveindex, region[i])) {
                region1.push(region[i]);
            }
        }
    }
    //区域分割.A凸点集合;B凹点集合
    function setSplitByRegion(p, region1, setA, setB) {
        var i = -1;
        while (++i < region1.length) {
            if (getMutiPtClockDirByIndex(p, region1[i])) {
                setA.push(region1[i]);
            }
            else {
                setB.push(region1[i]);
            }
        }
    }
    function normalizeVector2(v) {
        var n = Math.sqrt(v.x * v.x + v.y * v.y);
        if (n <= 0)
            return;
        v.x = v.x / n;
        v.y = v.y / n;
    }
    function dotVector2(v0, v1) {
        return v0.x * v1.x + v0.y * v1.y;
    }
    function getBestIntersectionPt(p, concaveindex, ptsets) {
        if (ptsets.length < 1)
            return -1;
        var bestindex = -1;
        var preindex, nextindex;
        preindex = (p.length + concaveindex - 1) % p.length;
        nextindex = (p.length + concaveindex + 1) % p.length;
        var d00 = new egret.Point();
        var d01 = new egret.Point();
        d00.x = (p[concaveindex].x - p[preindex].x);
        d00.y = (p[concaveindex].y - p[preindex].y);
        d01.x = (p[concaveindex].x - p[nextindex].x);
        d01.y = (p[concaveindex].y - p[nextindex].y);
        normalizeVector2(d00);
        normalizeVector2(d01);
        var fLen = -1;
        var i = -1;
        while (++i < ptsets.length) {
            var tp = new egret.Point();
            tp = p[ptsets[i]];
            var dp = new egret.Point();
            dp.x = tp.x - p[concaveindex].x;
            dp.y = tp.y - p[concaveindex].y;
            normalizeVector2(dp);
            var nTemLen = Math.abs(dotVector2(d00, dp));
            if (nTemLen > fLen) {
                bestindex = ptsets[i];
            }
        }
        return bestindex;
    }
    function getCrossByRadialAndSegment(p0, d0, p1, d1, crosspt) {
        //segments P0+s*D0 for s  in [0,1] ,P1+t*D1 for t in [0,1]
        var e = new egret.Point(p1.x - p0.x, p1.y - p0.y);
        var kross = d0.x * d1.y - d0.y * d1.x;
        var sqrKross = kross * kross;
        var sqrLen0 = d0.x * d0.x + d0.y * d0.y;
        var sqrLen1 = d1.x * d1.x + d1.y * d1.y;
        var sqrEpsilon = 0.01;
        if (sqrKross > sqrEpsilon * sqrLen0 * sqrLen1) {
            //lines of the segments are not parallel
            var s = (e.x * d1.y - e.y * d1.x) / kross;
            if (s < 0) {
                return 0;
            }
            var t = (e.x * d0.y - e.y * d0.x) / kross;
            if (t < 0 || t > 1) {
                //intersection of lines is not a point on segment P1 + t * D1
                return 0;
            }
            var pt = new egret.Point(d0.x * s, d0.y * s);
            //I[0]=P0+s*D0;
            crosspt.x = p0.x + pt.x;
            crosspt.y = p0.y + pt.y;
            return 1;
        }
        return 0;
    }
    //sPoint，ePoint直线上不同的两点
    //dPoint任意一点
    //该函数用来返回dPoint和直线的位置关系
    function GetPosRelationToLine(sp, ep, dp) {
        return dp.x * (ep.y - sp.y) + dp.y * (sp.x - ep.x) + sp.y * ep.x - sp.x * ep.y;
    }
})(SAT || (SAT = {}));
//# sourceMappingURL=ConvxCal.js.map