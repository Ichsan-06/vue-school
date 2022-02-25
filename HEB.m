 x = [0 0 1 1 ; 0 1 0 1];
t = [1 1 1 -1]; %target fungsi logika AND
w = [1 1 1 1]; %bobot
b = 1; %bias
for i = 1 : 4
 for j = 1 : 2
 w(j) = w(j) + t(i) * x(j,i); %proses perubahan
bobot
 end
 b = b + t(i);
end
disp('Bobot Baru :');
disp(w);
disp('Bias Baru : ');
disp(b);
plot(x(1,1), x(2,1), 'or',
'MarkerSize',20,'MarkerFaceColor', [0 0 1]);hold on;
plot(x(1,2), x(2,2), 'or',
'MarkerSize',20,'MarkerFaceColor', [1 0 0]);hold on;
plot(x(1,3), x(2,3), 'or',
'MarkerSize',20,'MarkerFaceColor', [1 0 0]);hold on;
plot(x(1,4), x(2,4), 'or',
'MarkerSize',20,'MarkerFaceColor', [1 0 0]);hold on;
m = -(w(1)/ w(2));
c = -b/w(2);
x1 = linspace(-2,2,100); x2 = m*x1 + c;
plot(x2, x1, 'r');
 axis([-2 2 -2 2]);
