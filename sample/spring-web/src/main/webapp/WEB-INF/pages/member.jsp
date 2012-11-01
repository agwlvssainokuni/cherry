<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8" session="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>メンバ管理</title>
<script type="text/javascript"
	src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript" src="<c:url value='/script/config.js' />"></script>
<script type="text/javascript" src="<c:url value='/script/member.js' />"></script>
<script type="text/javascript">
	var memberPage = null;
	$(function() {
		memberPage = new MemberPage(
				"<c:url value='/api/' />",
				DEFAULT_PAGE_SIZE,
				$("#MemberList table tbody"),
				"<tr><td>{id}</td><td><a href=\"#\" onclick=\"JavaScript:memo({id}); return false;\">{login}</a></td><td>{name}</td><td><input type='button' name='delete' value='削除' onclick='JavaScript:deregister({id});'></td></tr>",
				$("#MemberList .navi .prev a"), $("#MemberList .navi .next a"));
		memberPage.listCurr();
	});

	function memo(id) {
		memberPage.memberApi.get(id, function(member) {
			$("#MemoArea").val(member.memo);
		});
	}

	function register() {
		var login = $("#MemberLogin").val();
		var password = $("#MemberPassword").val();
		var passwordConf = $("#MemberPasswordConf").val();
		if (login.length <= 0) {
			alert("ログインIDが入力されていません");
			return;
		}
		if (password.length <= 0) {
			alert("パスワードが入力されていません");
			return;
		}
		if (password != passwordConf) {
			alert("パスワードが違っています");
			return;
		}
		var member = {
			login : login,
			passwd : password,
			name : $("#MemberName").val(),
			memo : $("#MemberMemo").val()
		};
		memberPage.memberApi.create(JSON.stringify(member));
		memberPage.listCurr();
	}

	function deregister(id) {
		memberPage.memberApi.del(id);
		memberPage.listCurr();
	}
</script>
</head>

<body>
	<div id="Header">
		<div id="Title">メンバ管理</div>
	</div>
	<div id="Content">
		<div id="MemberInfo">
			<table cellpadding="0" cellspacing="0">
				<tbody>
					<tr>
						<td>ログインID</td>
						<td><input id="MemberLogin" name="login" type="text"></td>
					</tr>
					<tr>
						<td>パスワード</td>
						<td><input id="MemberPassword" name="password"
							type="password"></td>
					</tr>
					<tr>
						<td>パスワード(確認)</td>
						<td><input id="MemberPasswordConf" name="passwordConf"
							type="password"></td>
					</tr>
					<tr>
						<td>氏名</td>
						<td><input id="MemberName" name="name" type="text"></td>
					</tr>
					<tr>
						<td>メモ</td>
						<td><textarea id="MemberMemo" name="memo" cols="40" rows="5"></textarea></td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<td colspan="2"><input id="MemberRegister" name="register"
							value="登録" type="button" onclick="JavaScript:register();"></td>
					</tr>
				</tfoot>
			</table>
		</div>
		<div id="MemberList">
			<div class="navi">
				<span class="prev"><a href="#"
					onclick="JavaScript:memberPage.listPrev(); false;">前へ</a></span><span
					class="spacer"></span><span class="next"><a href="#"
					onclick="JavaScript:memberPage.listNext(); false;">次へ</a></span>
			</div>
			<table cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>番号</th>
						<th>ログインID</th>
						<th>氏名</th>
						<th>削除</th>
					</tr>
				</thead>
				<tbody>
				</tbody>
				<tfoot>
					<tr>
						<td>メモ</td>
						<td colspan="3"><textarea id="MemoArea" name="memoArea"
								cols="40" rows="5"></textarea></td>
					</tr>
				</tfoot>
			</table>
			<div class="navi">
				<span class="prev"><a href="#"
					onclick="JavaScript:memberPage.listPrev(); false;">前へ</a></span><span
					class="spacer"></span><span class="next"><a href="#"
					onclick="JavaScript:memberPage.listNext(); false;">次へ</a></span>
			</div>
		</div>
	</div>
</body>
</html>
