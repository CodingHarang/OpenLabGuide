/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		var $menu = $('#menu'),
			// $menu_openers = $menu.children('ul').children('li').children('.opener');
			$menu_openers_1 = $menu.children('ul').children('li').children('.opener'),
			$menu_openers_2 = $menu.children('ul').children('li').children('ul').children('li').children('.opener'),
			$menu_openers_3 = $menu.children('ul').children('li').children('ul').children('li').children('ul').children('li').children('.opener');

		// Openers.
			$menu_openers_1.each(function() {
				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers_1.not($this).removeClass('active');
						$menu_openers_2.not($this).removeClass('active');
						$menu_openers_3.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});

			$menu_openers_2.each(function() {
				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers_2.not($this).removeClass('active');
						$menu_openers_3.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});

			$menu_openers_3.each(function() {
				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers_3.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});

		
	})(jQuery);

const string1_1 = "<header><h1>개요</h1></header><p>본 문서는 OpenLab 프로젝트의 개발자가 기획서를 토대로 개발을 진행할 때 꼭 지켜야 하는 사항과 창고해야 할 사항이 적혀 있는 가이드 문서이다. 기획팀과 공유해야 하는 사항들이 포함된다.</p>";
const string1_2 = "<header><h1>목표</h1></header><p>본 문서는 OpenLab 프로젝트의 개발자가 문서를 보고 바로 개발을 진행할 수 있을 정도의 정보를 제공할 수 있도록 한다. 또한 모든 에피소드에서의 구현 방법 통일을 목표로 한다.</p>";
const string1_3 = "<header><h1>정의</h1></header><h2>수행형 실험</h2><p>수행형 실험이란 유저가 실험 데스크 위에서 여러 실험 기구를 능동적으로 조작하는 실험이다.<h2>관찰형 실험</h2><p>관찰형 실험이란 유저가 홀로그램 테이블에서 홀로그램을 활용하여 특정 모델을 조작하고 관찰하는 실험이다.";
const string1_4 = "<header><h1>가이드를 시작하기 전</h1></header><p>본 가이드를 보기 전 알아야 할 사항으로는 다음과 같다. 특히 Visual Scripting 사용법과 커스텀 스크립트를 Visual Scripting에서 활용하는 방법을 숙지하고 있어야 목차3. 기능 구현 항목의 여러 기능들을 Visual Scripting에서 사용할 수 있다.<p>(1) 유니티 사용법<p>(2) C# 언어 사용법<p>(3) Visual Scripting 사용법";
const string2_1_1 = "<header><h1>새 에피소드 프로젝트 생성</h1></header><p>1. Git에서 OpenLab Initial 리포지토리를 클론한다. 여기에는 기본 실험실 환경, Project Setting, 필요한 에셋, 패키지 등 모든 에피소드에서 통일되어야 하는 사항들이 사전 세팅되어있다.<p style=color:red>2. 클론한 리포지토리의 .git파일을 삭제한다.<p>3. OpenLab Base 패키지를 import한다.<p>4. Asset 디렉토리 내에 OpenLab Custom 리포지토리를 클론한다. 여기에는 여러 개발자가 OpenLab Base 패키지와는 별개로 구현해놓은 주요 스크립트들이 존재한다.";
const string2_1_2 = "<header><h1>초기 프로젝트의 구성</h1></header><p>새 프로젝트 생성을 성공적으로 완수했다면 초기 프로젝트의 Assets 디렉토리에는 다음과 같은 폴더들이 있어야 한다. 목록과 비교해보며 제대로 클론되었는지 확인한다.<p>1. Amazing Assets: Advanced Dissolve 패키지의 파일들이 들어 있다.<p>2. Epic Toon FX: Epic Toon FX 패키지의 파일들이 들어 있다.<p>3. HandyHandPack: VR Hand Models Mega Pack- Handy Hands (Left & Right) 패키지의 파일들이 들어 있다.<p>4. LocalPackages/K_Labster: 실험실 환경의 3D 모델들과 매테리얼들이 여기에 들어 있다.<p>5. LocalPackages/Settings: URP의 설정 파일들이 여기에 들어 있다.<p>6. Materials: 프로젝트에 사용되는 매테리얼들이 위치해야 하는 폴더이다.<p>7. Plugins/AdjustPivot: Adjust Pivot 패키지의 파일들이 들어 있다.<p>8. Resources/Audio: 프로젝트에 사용되는 오디오 파일들이 위치해야 하는 폴더이다.<p><p>";
const string2_1_3 = "<header><h1>실험의 순서 및 단계 관리</h1></header><p>실험의 순서 및 단계는 모두 FlowManager 오브젝트의 Visual Scripting 그래프에서 관리한다.";
const string2_1_4 = "<header><h1>Import 되어 있는 패키지 리스트</h1></header><p style=color:red>(1)번 항목에서 OpenLab Initial 리포지토리를 클론하면 아래의 패키지들이 이미 import 되어 있다. 버전 업데이트시 기존의 프로젝트들과 호환이 안될 수 있으므로 버전을 반드시 확인한다.<h2>1. Adjust Pivot - yasirkula</h2><p>Ver. 1.0.6 - April 25, 2022<p>오브젝트의 기준점을 변경하는 데 사용한다.<h2>2. Advanced Dissolve - Amazing Assets</h2><p>Ver. 2022.6 - October 22, 2022<p>관찰형 실험에서 모델이 생성/변경될 때 사용한다.<h2>3. DOTween Pro - Demigiant</h2><p>Ver.<p>애니메이션을 코드로 간단하게 구현할 때 사용한다.<h2>4. VR Hand Models Mega Pack - Handy Hands (Left & Right) - Switchboard Studios</h2><p>ver. 1.11 - July 07, 2022<p>실험용 장갑 모델에 사용한다.<h2>5. Epic Toon FX - Archnor VFX</h2><p>Ver. 1.8 - December 09, 2021<p>관찰형 실험에서 홀로그램에 여러 이펙트를 넣는 데 사용한다.<h2>6. Living Particles - SineVFX</h2><p>Ver. 1.4c - April 27, 2021<p>관찰형 실험에서 홀로그램에 여러 이펙트를 넣는 데 사용한다.<h2>7. SCI-FI UI Pack Pro - D.F.Y STUDIO</h2><p>Ver. 2.1 - September 03, 2022<p>여러 UI를 구성할 때 사용한다.";
const string2_1_5 = "<header><h1>UI 디자인</h1></header><p>각 에피소드에서 사용되는 UI는 공유 드라이버에 공유되어 있는 프리팹을 사용한다.";
const string2_1_6 = "<header><h1>모든 조작 가능한 오브젝트의 Layer</h1></header><p>모든 조작 가능한 오브젝트의 Layer는 용도에 맞게 Object, UI, InteractionUI로 설정하도록 한다. 실험 기구나 모델은 Object Layer로, 각종 UI는 UI Layer로, 실험 기구나 모델에서 실시간 상호작용하는 UI는 InteractionUI Layer로 설정한다.</p><img src='C:\\YJSProjects\\OpenLabGuide\\2. 공통 설정\\1) 수행형_관찰형 공통\\2_1_7_1.png'><p>각종 실험 기구 → Object Layer</p><img src='C:\\YJSProjects\\OpenLabGuide\\2. 공통 설정\\1) 수행형_관찰형 공통\\2_1_7_2.png'><p>UI → UI Layer</p><img src='C:\\YJSProjects\\OpenLabGuide\\2. 공통 설정\\1) 수행형_관찰형 공통\\2_1_7_3.png'><p>실시간 상호작용 UI → InteractionUI Layer";
const string2_1_7 = "<header><h1>네이밍 컨벤션</h1></header><p>함수명: 파스칼 케이스 ex) ChangeCamera()<p>클래스 변수명: _변수명, 카멜 케이스 ex) _currentModel<p>메서드 변수명: 파스칼 케이스 ex) model<p><p>";
const string2_2_1 = "";
const string2_2_2 = "";
const string2_2_3 = "";
const string2_3_1 = "";
const string2_3_2 = "";
const string3_1_1 = "";
const string3_1_2 = "";
const string3_1_3 = "";
const string3_1_4 = "";
const string3_1_5 = "";
const string3_1_6 = "";
const string3_2_1 = "";
const string3_2_2 = "";
const string3_2_3 = "";
const string3_2_4 = "";
const string3_2_5 = "";
const string3_2_6 = "";
const string3_2_7 = "";
const string3_2_8 = "";
const string3_2_9 = "";
const string3_2_10 = "";
const string3_2_11 = "";
const string3_2_12 = "";
const string3_2_13 = "";
const string3_2_14 = "";
const string3_3_1 = "";
const string3_3_2 = "";
const string3_3_3 = "";
const string3_3_4 = "";
const string3_3_5 = "";
const string3_3_6 = "";
const string3_3_7 = "";
const string3_3_8 = "";
const string3_3_9 = "";
const string3_3_10 = "";
const string3_3_11 = "";
const string3_3_12 = "";
const string5_1_1_1 = "<header><h1>OpenLabBase</h1></header><table><h2>변수</h2><thead><tr><th>변수명<th>설명<tbody><tr><td>private GameObject _cachedGameObject<td><tr><td>private Transform _cachedTransform<td><tr><td>private AnimationStatusType _status<td><tr><td>public UnityEvent OnInitializeEvent<td><tr><td>public UnityEvent OnReleaseEvent<td><tr><td>public UnityEvent OnDisappearingEvent<td><tr><td>public GameObject GameObject<td><tr><td>public Transform Transform<td><tr><td>public Vector3 Position<td><tr><td>public Vector3 LocalPosition<td><tr><td>public Quaternion Rotation<td><tr><td>public Quaternion LocalRotation<td><tr><td>public vector3 LocalScale<td><tr><td>public AnimationStatusType Status<td><tr><td>Tweener callback<td></table><table><h2>함수</h2><thead><tr><th>함수명<th>설명<tbody><tr><td>public virtual void OnInitialize()<td><tr><td>public virtual void OnRelease()<td><tr><td>public virtual void Show()<td><tr><td>protected virtual Tweener PlayerShowAnimation()<td><tr><td>public virtual void Hide(UnityAction onComplete = null)<td><tr><td>protected virtual Tweener PlayHideAnimation()<td><tr><td>private IEnumerator ProcessInput(KeyCode key, UnityAction call)<td><tr><td>public void TriggerUnityEvent(string name)<td><tr><td>public void Release()<td><tr><td>public void SetLayerRecursively(Transform transform, string layerName)<td><tr><td>public Transform FindChildrenRecursively(Transform transform, string name)<td><tr><td>public void AddReleaseEvent(KeyCode key, UnityAction call)<td><tr><td>public void SetActive(bool value)<td></table>";
const string5_1_1_2 = "<header><h1>OpenLabBaseAudioData</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>public AudioClip[] AudioClips</table><table><thead><tr><th>Functions</thead></table>";
const string5_1_1_3 = "<header><h1>OpenLabInterface</h1></header><p>";
const string5_1_1_4 = "<header><h1>PlayerController</h1></header><table><h2>변수</h2><thead><tr><th>변수명<th>설명<tbody><tr><td>private CharacterController _controller<td><tr><td>private PhysicsRayCaster _raycaster<td><tr><td>private CustomInputModule _eventSystem<td><tr><td>private FollowingCamera _followingCamera<td><tr><td>private GameObject _hud<td><tr><td>private float _speed<td><tr><td>private bool _isLocked<td><tr><td>private bool _isRaycasterLocked<td><tr><td>public static PlayerController Instance<td></table><table><h2>함수</h2><thead><tr><th>함수명<th>설명<tbody><tr><td>private void Awake()<td><tr><td>private void Reset()<td><tr><td>private void Update()<td><tr><td>private void MovePlayer()<td><tr><td>private void RotateCamera()<td><tr><td>public void LockController(bool isLocked, bool isRaycasterLocked)<td><tr><td>public void SetTarget(Transform target, Vector3 offset = default, Vector3 dir = default)<td></table>"
const string5_1_1_5 = "<header><h1>UICanvas</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private RectTransform _rect<td><tr><td>public RectTransform Rect => _rect<td><tr><td>public static UICanvas Instance</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Reset()<td><tr><td>private void Awake()</table>";
const string5_1_2_1 = "<header><h1>SoundTypeComponent</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>public SoundType SoundType</table><table><thead><tr><th>Functions</thead></table>";
const string5_1_3_1 = "<header><h1>AnimationStatusType</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>public enum AnimationStatusType</table><table><thead><tr><th>Functions</thead></table>";
const string5_1_3_2 = "<header><h1>SoundType</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>public enum SoundType</table><table><thead><tr><th>Functions</thead></table>";
const string5_1_4_1 = "<header><h1>CustomInputModel</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private CursorLockMode _currentMode</table><table><thead><tr><th>Functions<th><tbody><tr><td>public override void Process()<td><tr><td>internal void SetCursorMode(CursorLockMode mode)</table>";
const string5_1_5_1 = "<header><h1>FlowManager</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private StateMachine _stateMachine<td><tr><td>private readonly Dictionary&lt;string, object><td><tr><td>public static FlowManager Instance</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Awake()<td><tr><td>private void Reset()<td><tr><td>public void TriggerUnityEvent(string name)<td><tr><td>public void SetVariable(string name, object value)<td><tr><td>public object GetVariable(string name)</table>";
const string5_1_5_2 = "<header><h1>ObjectPoolManager</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private List&lt;OpenLabBase> _prefabList<td><tr><td>private Transform _uiParent<td><tr><td>private Transform _objectParent<td><tr><td>private Dictionary&lt;string, PrefabPool> _prefabDictionary<td><tr><td>public static ObjectPoolManager Instance</table><table><thead><tr><th>Functions<th><tbody><tr><td>Private void Reset()<td><tr><td>private void Awake()<td><tr><td>private OpenLabBase OnCreateObject(string name)<td><tr><td>private void OnGetObject(OpenLabBase obj)<td><tr><td>private void OnReleaseObject(OpenLabBase obj)<td><tr><td>public OpenLabBase Create(string name)<td><tr><td>public void Release(OpenLabBase obj)<td><tr><td>public void ReleaseAllObjects(string name)</table>";
const string5_1_5_3 = "<header><h1>UIManager</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private Camera _uiCamera<td><tr><td>private RectTransform _masterCanvas<td><tr><td>private StateMachine _stateMachine<td><tr><td>private BaseUI _lastPoppedObject<td><tr><td>private readonly Stack&lt;BaseUI> _uiHistory<td><tr><td>private readonly Dictionary&lt;string, object><td><tr><td>public Camera UICamera => _uiCamera<td><tr><td>public RectTransform MasterCanvas => _masterCanvas<td><tr><td>public static UIManager Instance</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Reset()<td><tr><td>private void Awake()<td><tr><td>public BaseUI Push(string prefabName)<td><tr><td>public void Pop()<td><tr><td>public BaseUI Peek()<td><tr><td>public void TriggerUnityEvent(string name)<td><tr><td>public void setVariable(string name, object value)<td><tr><td>public object GetVariable(string name)</table>";
const string5_1_6_1 = "<header><h1>BaseObjectComponent</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>protected bool _isActive</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Start()<td><tr><td>public void SetComponentActive(bool value)</table>";
const string5_1_6_2 = "<header><h1>ObjectExplainer</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private string _tooltipMessage<td><tr><td>private Vector2 _tooltipOffset<td><tr><td>private TooltipUI _tooltip</table><table><thead><tr><th>Functions<th><tbody><tr><td>public void OnPointerDown(PointerEventData eventData)<td><tr><td>public void OnPointerEnter(PointerEventData eventData)<td><tr><td>public void OnPointerExit(PointerEventData eventData)<td><tr><td>public void ReleaseTooltip()<td><tr><td>public void SetTooltipMessage(string message)<td><tr><td>public void SetTooltipOffset(Vector2 offset)</table>";
const string5_1_6_3 = "<header><h1>ObjectInteractor</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private List&lt;KeyBinding> _keys<td><tr><td>private InteractionMenuUI _menu<td><tr><td>private Coroutine _processor</table><table><thead><tr><th>Functions<th><tbody><tr><td>private IEnumerator ProcessInput()<td><tr><td>public void OnPointerEnter(PointerEventData eventData)<td><tr><td>public void OnPointerExit(PointerEventData eventData)<td><tr><td>public void AddKeyBinding(KeyCode command, string message, UnityAction callback)</table>";
const string5_1_6_4 = "<header><h1>ObjectMover</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private Camera _camera<td><tr><td>private bool _isPointerDown</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Start()<td><tr><td>private void Update()<td><tr><td>public void OnPointerUp(PointerEventData eventData)<td><tr><td>public void OnPointerDown(PointerEventData eventData)</table>";
const string5_1_6_5 = "<header><h1>ObjectOutliner</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private QuickOutline _outline</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Reset()<td><tr><td>internal void Disable()<td><tr><td>internal void Enable()<td><tr><td>public void OnPointerEnter(PointerEventData eventData)<td><tr><td>public void OnPointerExit(PointerEventData eventData)</table>";
const string5_1_6_6 = "<header><h1>ObjectResizer</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private Vector3 _initialScale<td><tr><td>private float _weight<td><tr><td>private float _maximumScale<td><tr><td>private float _minimumScale<td><tr><td>private float _currentScale</table><table><thead><tr><th>Functions<th><tbody><tr><td>public void OnScroll(PointerEventData eventData)<td><tr><td>internal void Initialize()</table>";
const string5_1_6_7 = "<header><h1>ObjectRotator</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private Vector3_initialRotation<td><tr><td>public float _speed<td><tr><td>public float _smoothSpeed<td><tr><td>private Camera _cam<td><tr><td>private float _mouseX<td><tr><td>private float _mouseY<td><tr><td>private float _mouseXX<td><tr><td>private float _mouseYY<td><tr><td>private bool _isMouseDown<td><tr><td>private bool _isMouseXup<td><tr><td>private bool _isMouseYup<td><tr><td>private bool _isRotateAvailable<td><tr><td>private Transform _camera</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Reset()<td><tr><td>private void Start()<td><tr><td>public void ChangeRotatable(bool rotatable)<td><tr><td>public void StopRotate()<td><tr><td>private void OnMouseDrag()<td><tr><td>private void OnMouseDown()<td><tr><td>private void OnMouseUp()<td><tr><td>private void Update()<td><tr><td>internal void Initialize()</table>";
const string5_1_7_1 = "<header><h1>BaseObject</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>protected EventTrigger _trigger<td><tr><td>protected Collider _collider<td><tr><td>protected Transform _initialParent<td><tr><td>protected Quaternion _initialRotation<td><tr><td>protected Vector3 _initialPosition<td><tr><td>protected Vector3 _initialScale<td><tr><td>protected bool _isInitialized<td><tr><td>public EventTrigger EventTrigger => _trigger<td><tr><td>public List&lt;Entry> Triggers => _trigger.triggers</table><table><thead><tr><th>Functions<th><tbody><tr><td>protected virtual void Reset()<td><tr><td>protected virtual void Start()<td><tr><td>public virtual void SetColliderActive(bool value)<td><tr><td>public override void OnInitialize()<td><tr><td>public override void onRelease()<td><tr><td>public void AddListener(EventTriggerType type, UnityAction&lt;BaseEventData> call)<td><tr><td>public void StoreAsInitialValue()</table>";
const string5_1_7_2 = "<header><h1>ClickableObject</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private ObjectOutline _outliner</table><table><thead><tr><th>Functions<th><tbody><tr><td>protected override void Reset()<td><tr><td>protected override void Start()<td><tr><td>public override void OnInitialize()<td><tr><td>public override void OnRelease()</table>";
const string5_1_7_3 = "<header><h1>ExplainableObject</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private ObjectExplainer _explainer</table><table><thead><tr><th>protected override void Reset()<th><tbody><tr><td>private void OnDisable()<td><tr><td>public void SetTooltipMessage(string message)<td><tr><td>public void SetToolTipOffset(Vector2 offset)</table>";
const string5_1_7_4 = "<header><h1>GrabbableObject</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private Collider[] _colliders<td><tr><td>protected BaseObject _targetObject<td><tr><td>protected bool _isPointingTarget<td><tr><td>protected readonly List&lt;Entry> _entries<td><tr><td>public UnityEvent OnPointerDownEvent<td><tr><td>public UnityEvent OnSuccessDragEvent<td><tr><td>public UnityEvent OnFailDragEvent<td><tr><td>public UnityEvent OnPointerEnterEvent<td><tr><td>public UnityEvent OnPointerExitEvent<td><tr><td>public BaseObject TargetObject => _targetObject</table><table><thead><tr><th>Functions<th><tbody><tr><td>public override void SetColliderActive(bool value)<td><tr><td>public override void OnInitialize()<td><tr><td>public override void OnRelease()<td><tr><td>protected override Start()<td><tr><td>public void SetTarget(BaseObject target)<td><tr><td>private Entry AddEventListener(EventTrigger trigger, EventTriggerType type, UnityAction&lt;BaseEventData> call)<td><tr><td>private void OnPointerExit(BaseEventData eventData)<td><tr><td>private void OnPointerEnter(BaseEventData eventData)<td><tr><td>protected virtual void OnPointerUp(BaseEventData eventData)<td><tr><td>protected virtual void OnPointerDown(BaseEventData eventData)</table>";
const string5_1_7_5 = "<header><h1>InteractableObject</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private ObjectInteractor _interactor</table><table><thead><tr><th>Functions<th><tbody><tr><td>protected override void Reset()<td><tr><td>public void AddKeyBinding(KeyCode command, string message, UnityAction callback)<td><tr><td>public override void SetColliderActive(bool value)</table>";
const string5_1_7_6 = "<header><h1>MovableObject</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private BaseObject _targetObject<td><tr><td>private EventTrigger _targetTrigger<td><tr><td>private UnityEvent _onSuccessDrag<td><tr><td>private bool _isPointingTarget</table><table><thead><tr><th>Functions<th><tbody><tr><td>protected override void Reset()<td><tr><td>public override void OnInitialize()<td><tr><td>protected override void Start()<td><tr><td>private void AddEventListener(EventTrigger trigger, EventTriggerType type, UnityAction&lt;BaseEventData> call)<td><tr><td>private void OnPointerExit(BaseEventData eventData)<td><tr><td>private void OnPointerEnter(BaseEventData eventData)<td><tr><td>private void OnEndDrag(BaseEventData eventData)<td><tr><td>private void OnBeginDrag(BaseEventData eventData)</table>";
const string5_1_7_7 = "<header><h1>ObservableObject</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private ObjectRotator _rotator<td><tr><td>private ObjectResizer _resizer</table><table><thead><tr><th>Functions<th><tbody><tr><td>protected override void Reset()<td><tr><td>public override void OnInitialize()</table>";
const string5_1_8_1 = "<header><h1>BaseUI</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private bool _isPopup<td><tr><td>private bool _needRaycaster<td><tr><td>public bool IsPopup<td><tr><td>public bool NeedRaycaster</table><table><thead><tr><th>Functions<th><tbody><tr><td>protected virtual void Reset()<td><tr><td>public override void OnInitialize()</table>";
const string5_1_8_2 = "<header><h1>DashboardUI</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private Button[] _buttons<td><tr><td>private RectTransform[] _contents</table><table><thead><tr><th>Functions<th><tbody><tr><td>protected override void Reset()<td><tr><td>private void Start()<td><tr><td>private void OnClickButton(int index)<td><tr><td>public void SetPage(int page)</table>";
const string5_1_8_3 = "<header><h1>InteractionMenuItem</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private TextMeshProUGUI _text</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Reset()<td><tr><td>public void Initialize(KeyCode code, string message)</table>";
const string5_1_8_4 = "<header><h1>InteractionMenuUI</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private Transform _layout<td><tr><td>private List&lt;InteractionMenuItem> _items</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Awake()<td><tr><td>protected override void Reset()<td><tr><td>public override void OnRelease()<td><tr><td>public void AddMenu(params Tuple&lt;KeyCode, string>[] menus)</table>";
const string5_1_8_5 = "<header><h1>LeftMenuUI</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private Button[] _buttons<td><tr><td>private RectTransform MenuBar</table><table><thead><tr><th>Functions<th><tbody><tr><td>protected override void Reset()<td><tr><td>private void Start()<td><tr><td>private void OnClickButton(int index)<td><tr><td>public override void Show()<td><tr><td>protected override Tweener PlayShowAnimation()<td><tr><td>protected override Tweener PlayHideAnimation()</table>";
const string5_1_8_6 = "<header><h1>MessageUI</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private TextMeshProUGUI _textMesh</table><table><thead><tr><th>Functions<th><tbody><tr><td>protected override void Reset()<td><tr><td>public void SetMessage(string message)<td><tr><td>public void SetMessage(string message, float duration)<td><tr><td>IEnumerator HideMessage(float duration)<td><tr><td>public override void OnInitialize()</table>";
const string5_1_8_7 = "<header><h1>TooltipUI</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private RectTransform _rect<td><tr><td>private TextMeshProUGUI _textMesh<td><tr><td>private Transform _target<td><tr><td>private Vector2 _offset</table><table><thead><tr><th>Functions<th><tbody><tr><td>protected override void Reset()<td><tr><td>private void Update()<td><tr><td>public void SetTarget(Transform target, string message = null, Vector2 offset = default(Vector2))<td><tr><td>public override void OnInitialize()<td><tr><td>public override void OnRelease()</table>";
const string5_2_1_1 = "<header><h1>Burette</h1></header><table><thead><tr><th>Variables</thead></table><table><thead><tr><th>Functions<th><tbody><tr><td>override protected void Start()<td><tr><td>public void EnableClick()<td><tr><td>public void DisableClick()<td><tr><td>public void RotateHandle()<td><tr><td>public void DisableMover()<td><tr><td>public void EnableMover()</table>";
const string5_2_1_2 = "<header><h1>CameraMoveQE</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>public float upSpeed<td><tr><td>private Vector3 scaleChange</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Update()</table>";
const string5_2_1_3 = "<header><h1>CameraZoom</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>public float speed<td><tr><td>private Camera thisCamera<td><tr><td>private Vector3 worldDefaultForward</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Start()<td><tr><td>private void Update()</table>";
const string5_2_1_4 = "<header><h1>CloseButton</h1></header><table><thead><tr><th>Variables</thead></table><table><thead><tr><th>Functions<th><tbody><tr><td>public void ListenClose()</table>";
const string5_2_1_5 = "<header><h1>Container</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private Material _mat<td><tr><td>public float _maxAmount<td><tr><td>public float _currentAmount<td><tr><td>private Container _targetContainer</table><table><thead><tr><th>Functions<th><tbody><tr><td>protected void Start()<td><tr><td>public void AddFluid(float amount, float time)<td><tr><td>public void RemoveFluid(float amount, float time)<td><tr><td>public void ChangeFluidColor(float r, float g, float b, float a)<td><tr><td>public void Pour(Vector3, up, Vector3, down)<td><tr><td>public void SetTargetContainer(ExperimentalObject targetContainer)</table>";
const string5_2_1_6 = "<header><h1>ElectronicScale</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private TextMeshPro _tmp</table><table><thead><tr><th>Functions<th><tbody><tr><td>new private void Start()<td><tr><td>public void EnableClick()<td><tr><td>public void DisableClick()<td><tr><td>public void ZeroPointAdjustment()<td><tr><td>public void SetText(float weight)<td><tr><td>public void setTextEnabled(bool enabled)<td><tr><td>public void DisableMover()<td><tr><td>public void EnableMover()</table>";
const string5_2_1_7 = "<header><h1>ExperimentalHelper</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private ExperimentalObject[] _objects<td><tr><td>private Dictionary&lt;ObjectType, ExperimentalObject> _objectMap<td><tr><td>private UnityAction OnPointerDownEvent<td><tr><td>private UnityAction OnFailDragEvent<td><tr><td>public static ExperimentalHelper Instance</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Awake()<td><tr><td>private void Reset()<td><tr><td>private void Start()<td><tr><td>private void PlayRotating(Transform transform, Vector3 vector3, float duration, bool isLocal, bool setRelative)<td><tr><td>private void PlayMoving(Transform transform, Vector3 vector3, float duration, bool isLocal, bool setRelative)<td><tr><td>private void OnSuccessDrag(ExperimentalObject expObj)<td><tr><td>public ExperimentalObject GetExpObj(ObjectType type)<td><tr><td>public void AddListener(ObjectType current, ObjectType target, Vector3 targetPosition, Vector3 targetRotation)<td><tr><td>public void RemoveListener(ObjectType current)<td><tr><td>public void ShowSilhouette(ObjectType currentObject, Vector3 targetPosition, Vector3 targetRotation<td><tr><td>public void HideSilhouette(ObjectType currentObject)<td><tr><td>public void SetGuideStatus(ObjectType type, bool setHighlight)<td><tr><td>public void SetPositionAndRotation(ObjectType current, ObjectType target = ObjectType.None, Vector3 positionOffset = default, Vector3 rotationOffset = default<td><tr><td>public Vector3 GetPositionP(ObjectType type)<td><tr><td>public void MoveAndRotate(ObjectType type, Vector3 pos, float duration, bool posLocal, bool posRelative, Vector3 ang, bool angLocal, bool angRelative<td><tr><td>public void SetGuideAddListener(ObjectType current, ObjectType target, Vector3 position, Vector3 rotation)<td><tr><td>public void EndGuideRemoveListener(ObjectType current, ObjectType target)</table>";
const string5_2_1_8 = "<header><h1>ExperimentalObject</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private BaseObject _baseObject<td><tr><td>private ExperimentalObjectType _objectType<td><tr><td>public BaseObject BaseObject => _baseObject<td><tr><td>public GrabbableObject GrabbableObject => _baseObject as GrabbableObject<td><tr><td>public ExperimentalObjectType ObjectType => objectType<td><tr><td>public List&lt;Renderer> _renderers<td><tr><td>public List&lt;Material[]> _matMesh<td><tr><td>public Material _matHighLight</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Reset()<td><tr><td>protected void Start()<td><tr><td>public void SetHighLight(bool highlighted)<td><tr><td>public void SetTarget(ExperimentalObject target)</table>";
const string5_2_1_9 = "<header><h1>ExperimentalObjectType</h1></header><p>";
const string5_2_1_10 = "<header><h1>InteractiveContainer</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private TextMeshProUGUI _text<td><tr><td>private Canvas _canvas<td><tr><td>private Button _buttonUp, _buttonDown, _buttonOK<td><tr><td>private float _targetValue<td><tr><td>public string _unit<td><tr><td>public float _unitScale<td><tr><td>private bool _isUIActive<td><tr><td>private EventTrigger _trigger</table><table><thead><tr><th>Functions<th><tbody><tr><td>new private void Start()<td><tr><td>private void OnScroll(PointerEventDate data)<td><tr><td>new private void AddFluid(float amount, float time)<td><tr><td>new private void RemoveFluid(float amount, float time)<td><tr><td>public void CheckAmount()<td><tr><td>public void SetTargetValue(float target)<td><tr><td>public void SetUIActive(bool active)</table>";
const string5_2_1_11 = "<header><h1>ObjectGuideUI</h1></header><p>";
const string5_3_1_1 = "<header><h1>BottomHologramButton</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>protect string _buttonName</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Reset()<td><tr><td>public void AddListener()<td><tr><td>public void RemoveListener()<td><tr><td>virtual public void Clicked()</table>";
const string5_3_1_2 = "<header><h1>BottomObserverUI</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private List&lt;RectTransform> _buttons<td><tr><td>private Sequence _seq</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Reset()<td><tr><td>public void ShowObserverMenu()<td><tr><td>public void HideObserverMenu()<td><tr><td>public void AddListeners()<td><tr><td>public void RemoveListeners()</table>";
const string5_3_1_3 = "<header><h1>ButtonChangeModel</h1></header><table><thead><tr><th>Variables</thead></table><table><thead><tr><th>Functions<th><tbody><tr><td>public void ChangeModelType()</table>";
const string5_3_1_4 = "<header><h1>ButtonExit</h1></header><table><thead><tr><th>Variables</thead></table><table><thead><tr><th>Functions<th><tbody><tr><td>public void ShowExitButton()<td><tr><td>public void HideExitButton()</table>";
const string5_3_1_5 = "<header><h1>ButtonRotate</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private SpriteState _currentSpriteState<td><tr><td>private SpriteState _savedSpriteState<td><tr><td>private Sprite _spriteSelected<td><tr><td>private Sprite _spriteUnselected<td><tr><td>private bool _selected</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Start()<td><tr><td>override public void Clicked()<td><tr><td>public void SetSelected(bool selected)<td><tr><td>public void SwitchToSelected()<td><tr><td>public void SwitchToUnselected()</table>";
const string5_3_1_6 = "<header><h1>ButtonShowAngle</h1></header><table><thead><tr><th>Variables</thead></table><table><thead><tr><th>Functions<th><tbody><tr><td>public void ShowAngle()</table>";
const string5_3_1_7 = "<header><h1>CloseButton</h1></header><table><thead><tr><th>Variables</thead></table><table><thead><tr><th>Functions<th><tbody><tr><td>public void ListenClose()</table>";
const string5_3_1_8 = "<header><h1>CustomAudioPlayer</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private AudioSourece _audioSource<td><tr><td>public static CustomAudioPlayer Instance = null</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Awake()<td><tr><td>private void Reset()<td><tr><td>public void Play(string name, int playType)<td><tr><td>public void Stop()</table>";
const string5_3_1_9 = "<header><h1>ExperimentalHelper</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private ExperimentalObject[] _objects<td><tr><td>private GameObject _playerCamera<td><tr><td>private LeftObserverUI _leftObsererUI<td><tr><td>private BottomObserverUI _bottomObserverUI<td><tr><td>private Transform _diffusionPlaneModelNumber<td><tr><td>private Transform _diffusionPlaneModelType<td><tr><td>private Transform _diffusionPlaneBackgroundWall<td><tr><td>private float _tweenTime<td><tr><td>private string _currentModel<td><tr><td>private bool _rotatable<td><tr><td>private bool _isFirst<td><tr><td>private bool[] _isDone<td><tr><td>private int _modelType<td><tr><td>private Dictionary&lt;ObjectType, ExperimentalObject> _objectMap</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Start()<td><tr><td>public ExperimentalObject GetExpObj(ObjectType type)<td><tr><td>public void ChangeCamera(bool isLocked, bool isRaycasterLocked)<td><tr><td>public void RemoveChild(GameObject obj)<td><tr><td>public void ShowBackgroundWall()<td><tr><td>public void HideBackgroundWall()<td><tr><td>public void SetModelActive(bool active)<td><tr><td>public void MoveModel(int position, string currentModel = \"\")<td><tr><td>public void MoveDiffusionPlane(int position)<td><tr><td>public void ChangeModelType()<td><tr><td>public void ChangeModel(string path)<td><tr><td>public void LoadModel<td><tr><td>public void ChangeModelRotatable()<td><tr><td>public void ModelSizeUp()<td><tr><td>public void ModelSizeDown()<td><tr><td>public void SetLeftObserverUIActive(bool active)<td><tr><td>pulbic void SetBottomObserverUIActive(bool active)<td><tr><td>public void ShowModelAngle()<td><tr><td>public bool CheckDone()</table>";
const string5_3_1_10 = "<header><h1>ExperimentalObject</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private BaseObject _baseObject<td><tr><td>private ExperimentalObjectType _objectType<td><tr><td>public BseObject BaseObject => _baseObject<td><tr><td>public GrabbableObject GrabbableObject => _baseObject<td><tr><td>public ExperimentalObjectType ObjectType => _objectType</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Reset()<td><tr><td>public void SetTarget(ExperimentalObject target)</table>";
const string5_3_1_11 = "<header><h1>ExperimentalObjectType</h1></header><p>";
const string5_3_1_12 = "<header><h1>LeftHologramButton</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private string _buttonName<td><tr><td>private Sprite _greenSourceSprite<td><tr><td>private Sprite _greenInteractionSpritep<td><tr><td>private EventTrigger _eventTrigger<td><tr><td>private Text _text</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Reset()<td><tr><td>private void Start()<td><tr><td>public void AddListener()<td><tr><td>public void AddMouseExitListener()<td><tr><td>public void RemoveMouseExitListener()<td><tr><td>public void RemoveListener()<td><tr><td>public void Clicked()<td><tr><td>public void AlphaDown()<td><tr><td>public void AlphaUp()<td><tr><td>public void SwitchLight()</table>";
const string5_3_1_13 = "<header><h1>LeftObserverUI</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private List&lt;RectTransform> _buttons<td><tr><td>private Sequence _seq</table><table><thead><tr><th>Functions<th><tbody><tr><td>private void Reset()<td><tr><td>public void ShowObserverMenu()<td><tr><td>public void HideObserverMenu()<td><tr><td>public void ResetAlpha(int idx)<td><tr><td>public void AddListeners()<td><tr><td>public void RemoveListeners()</table>";
const string5_3_1_14 = "<header><h1>ObjectGuideUI</h1></header><p>";
const string5_3_1_15 = "<header><h1>ResizableObject</h1></header><table><thead><tr><th>Variables<th><tbody><tr><td>private float scaleFactor</table><table><thead><tr><th>Functions<th><tbody><tr><td>public void SizeUp()<td><tr><td>public void SizeDown()</table>";
// const string = "";
// const string = "";
function test(string) {
	const element = document.getElementById('content');
	
	eval("element.innerHTML = " + "string" + string);
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                console.log(allText);
            }
        }
    }
    rawFile.send(null);
}