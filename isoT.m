function isoT(a,b)
%isoT         append Inspector-selected or brushed traces
%isoT(3,'up') also grab traces above 3 within current XLim
%isoT('spec') grab everything violating the Spec lines
%isoT('rest') hide already-isolated traces in source
%isoT('all')  unhide   isoT('clear')   isoT('list')
s=gca;
if strcmp(get(gcf,'Tag'),'ISOFIG'), error('click the source axes first'), end
t=s.Title.String; if iscell(t), t=t{1}; end
n=['Isolated: ' t];
g=findobj('Type','figure','Name',n);
if isempty(g)
  g=figure('Name',n,'Tag','ISOFIG','NumberTitle','off');
  d=axes(g); grid(d,'on'); title(d,n);
  xlabel(d,s.XLabel.String); ylabel(d,s.YLabel.String);
else
  d=findobj(g,'Type','axes'); d=d(1);
end
L=findobj(s,'Type','line'); o=findobj(d,'Type','line'); h={};
if ~isempty(o), h=cellstr(get(o,'DisplayName')); end
if nargin==1&&ischar(a)
  switch a
    case 'clear', delete(o); legend(d,'off'); return
    case 'list',  disp(h), return
    case 'all',   set(L,'Visible','on'), return
    case 'rest'
      for k=1:numel(L)
        if any(strcmp(L(k).DisplayName,h)), L(k).Visible='off'; end
      end
      return
  end
end
sp=nargin==1&&ischar(a)&&strcmp(a,'spec');
if sp
  S=findobj(s,'Type','line','-regexp','DisplayName','Spec');
  up=contains(s.YLabel.String,'VSWR');
end
xl=xlim(s); m=false(size(L));
for k=1:numel(L)
  q=L(k).DisplayName;
  if isempty(q)||any(strcmp(q,h))||contains(q,'Spec'), continue, end
  x=L(k).XData; y=L(k).YData; i=x>=xl(1)&x<=xl(2);
  v=strcmp(L(k).Selected,'on')||any(L(k).BrushData);
  if nargin==2
    v=v||(b(1)=='u'&&any(y(i)>a))||(b(1)=='l'&&any(y(i)<a));
  elseif sp
    for j=1:numel(S)
      sx=S(j).XData; w=i&x>=min(sx)&x<=max(sx);
      if ~any(w), continue, end
      r=interp1(sx,S(j).YData,x(w),'linear','extrap');
      v=v||(up&&any(y(w)>r))||(~up&&any(y(w)<r));
    end
  end
  m(k)=v;
end
c=copyobj(L(m),d); set([c(:);L(m)],'Selected','off'); set(c,'LineWidth',1.5);
xlim(d,xl); ylim(d,ylim(s)); grid(d,'on');
o=findobj(d,'Type','line');
if numel(o)<=25, legend(d,'show','Location','eastoutside','Interpreter','none');
else legend(d,'off'); end
figure(g); disp(get(L(m),'DisplayName'))
fprintf('%d new, %d total\n',numel(c),numel(o))
