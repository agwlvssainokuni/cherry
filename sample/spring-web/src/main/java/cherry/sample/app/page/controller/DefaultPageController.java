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

package cherry.sample.app.page.controller;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * JSPを表示する.
 */
@RequestMapping("/page")
public interface DefaultPageController {

	/**
	 * JSPを表示する.
	 *
	 * @param viewName
	 *            ビュー名
	 * @return モデル・ビュー
	 */
	@RequestMapping(value = "{viewName}", method = { GET, POST })
	ModelAndView process(@PathVariable("viewName") String viewName);

}
