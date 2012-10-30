/*
 *   Copyright 2012 Norio Agawa
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

/**
 * メンバ管理API.
 *
 * @param path
 * @returns
 */
function MemberApi(path) {
	this.apiPath = path;
	$.ajaxSetup({
		async : true,
		cache : false,
		accepts : {
			json : "application/json",
			xml : "application/json"
		},
		dataType : "json"
	});
}

MemberApi.prototype = {
	create : function(member) {
		var id = null;
		$.ajax({
			url : this.apiPath + "member",
			type : "POST",
			contentType : "application/json",
			async : false,
			data : member,
			processData : false,
			success : function(data, textStatus, jqXHR) {
				var result = data["resultDto"];
				if (result["code"] == 0) {
					id = result["data"];
				}
			}
		});
		return id;
	},
	list : function(offset, pageSize, callback) {
		$.ajax({
			url : this.apiPath + "member",
			type : "GET",
			data : {
				"offset" : offset,
				"pageSize" : pageSize
			},
			processData : true,
			success : function(data, textStatus, jqXHR) {
				var result = data["resultDto"];
				if (result["code"] == 0) {
					callback(result["data"]["totalCount"], offset,
							result["data"]["member"]);
				}
			}
		});
	},
	get : function(id, callback) {
		$.ajax({
			url : this.apiPath + "member/" + id,
			type : "GET",
			success : function(data, textStatus, jqXHR) {
				var result = data["resultDto"];
				if (result["code"] == 0) {
					callback(result["data"]);
				}
			}
		});
	},
	update : function(id, member) {
		$.ajax({
			url : this.apiPath + "member/" + id,
			type : "PUT",
			contentType : "application/json",
			async : false,
			data : member,
			processData : false
		});
	},
	del : function(id) {
		$.ajax({
			url : this.apiPath + "member/" + id,
			type : "DELETE",
			async : false
		});
	}
};

/**
 * メンバ管理ページのイベント処理.
 *
 * @param path
 * @param pageSize
 * @param target
 * @param template
 * @param naviPrev
 * @param naviNext
 * @returns
 */
function MemberPage(path, pageSize, target, template, naviPrev, naviNext) {
	this.memberApi = new MemberApi(path);
	this.currPageNo = 1;
	this.listPageSize = pageSize;
	this.listTarget = target;
	this.listTemplate = template;
	this.listNaviPrev = naviPrev;
	this.listNaviNext = naviNext;
}

MemberPage.prototype = {
	listCurr : function() {
		this.listPage(this.currPageNo);
	},
	listPrev : function() {
		this.listPage(this.currPageNo - 1);
	},
	listNext : function() {
		this.listPage(this.currPageNo + 1);
	},

	listPage : function(pageNo) {
		var object = this;
		this.memberApi.list((pageNo - 1) * this.listPageSize,
				this.listPageSize, function(count, offset, members) {
					object.callbackListDraw(count, offset, members);
					object.callbackListNavi(count, offset, members);
				});
	},
	callbackListDraw : function(count, offset, members) {
		this.listTarget.empty();
		if (members == null) {
			return;
		}
		for ( var i = 0; i < members.length; i++) {
			var row = this.listTemplate.replace(/\{([\w]+)\}/g, function(
					matched, word, offset, str) {
				return members[i][word];
			});
			this.listTarget.append(row);
		}
	},
	callbackListNavi : function(count, offset, members) {
		var reminder = count % this.listPageSize;
		var maxPageNo = (count - reminder) / this.listPageSize
				+ (reminder > 0 ? 1 : 0);
		if (maxPageNo <= 0) {
			this.listNaviPrev.css("visibility", "hidden");
			this.listNaviNext.css("visibility", "hidden");
			this.currPageNo = 1;
		} else {
			var pageNo = offset / this.listPageSize + 1;
			if (pageNo <= 1) {
				pageNo = 1;
				this.listNaviPrev.css("visibility", "hidden");
			} else {
				this.listNaviPrev.css("visibility", "visible");
			}
			if (pageNo > maxPageNo) {
				this.currPageNo = maxPageNo;
				this.listCurr();
			} else {
				if (pageNo == maxPageNo) {
					this.listNaviNext.css("visibility", "hidden");
				} else {
					this.listNaviNext.css("visibility", "visible");
				}
				this.currPageNo = pageNo;
			}
		}
	}
};
