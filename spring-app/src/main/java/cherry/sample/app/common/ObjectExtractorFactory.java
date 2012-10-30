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

package cherry.sample.app.common;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.Charset;

import javax.script.ScriptException;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import cherry.util.js.ObjectExtractor;

/**
 * 設定データ抽出機能のファクトリ.
 */
@Component("configObjectExtractor")
public class ObjectExtractorFactory implements FactoryBean<ObjectExtractor> {

	/** 設定データの抽出元. */
	@Value("/script/config.js")
	private Resource config;

	/** 設定データファイルのエンコーディング. */
	@Value("UTF-8")
	private Charset charset;

	/**
	 * 設定データ抽出機能を取得する.
	 *
	 * @return 設定データ抽出機能
	 */
	@Override
	public ObjectExtractor getObject() throws ScriptException, IOException {

		ObjectExtractor objectExtractor = new ObjectExtractor();
		objectExtractor.initialize();

		Reader reader = new InputStreamReader(config.getInputStream(), charset);
		try {
			String jsCode = IOUtils.toString(reader);
			objectExtractor.eval(jsCode);
		} finally {
			reader.close();
		}

		return objectExtractor;
	}

	/**
	 * ファクトリが作成するインスタンスのクラスを取得する.
	 *
	 * @return {@link ObjectExtractor}クラス
	 */
	@Override
	public Class<?> getObjectType() {
		return ObjectExtractor.class;
	}

	/**
	 * ファクトリが作成するインスタンスがシングルトンか否か.
	 *
	 * @return 真 (シングルトンである)
	 */
	@Override
	public boolean isSingleton() {
		return true;
	}

}
